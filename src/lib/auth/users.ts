import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string;
  role: "admin" | "staff";
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]", "utf-8");
}

export function readUsers(): User[] {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8")) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  ensureStore();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function findUserByUsername(username: string): User | undefined {
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id);
}

export async function createUser(data: {
  username: string;
  password: string;
  displayName: string;
  role: "admin" | "staff";
}): Promise<User> {
  const users = readUsers();
  if (users.some((u) => u.username.toLowerCase() === data.username.toLowerCase())) {
    throw new Error("ชื่อผู้ใช้นี้มีอยู่แล้ว");
  }
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user: User = {
    id: `USR${Date.now().toString(36).toUpperCase()}`,
    username: data.username.trim(),
    passwordHash,
    displayName: data.displayName.trim(),
    role: data.role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function changePassword(userId: string, newPassword: string): Promise<void> {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("ไม่พบผู้ใช้");
  users[idx].passwordHash = await bcrypt.hash(newPassword, 12);
  writeUsers(users);
}

export function deleteUser(userId: string): void {
  const users = readUsers().filter((u) => u.id !== userId);
  writeUsers(users);
}

/** Auto-create default admin on first run if no users exist */
export async function ensureDefaultAdmin() {
  const users = readUsers();
  if (users.length === 0) {
    await createUser({
      username: "admin",
      password: "maporn2024",
      displayName: "ผู้ดูแลระบบ",
      role: "admin",
    });
  }
}
