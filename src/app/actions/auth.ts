"use server";
import { redirect } from "next/navigation";
import {
  findUserByUsername,
  verifyPassword,
  createUser,
  ensureDefaultAdmin,
  readUsers,
} from "@/lib/auth/users";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";

export type AuthState =
  | { errors?: { username?: string[]; password?: string[]; general?: string[] } }
  | undefined;

export async function login(state: AuthState, formData: FormData): Promise<AuthState> {
  await ensureDefaultAdmin();

  const username = (formData.get("username") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!username) return { errors: { username: ["กรุณากรอกชื่อผู้ใช้"] } };
  if (!password) return { errors: { password: ["กรุณากรอกรหัสผ่าน"] } };

  const user = findUserByUsername(username);
  if (!user) return { errors: { general: ["ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"] } };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { errors: { general: ["ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"] } };

  await createSession(user.id, user.username, user.displayName, user.role);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export type CreateUserState =
  | { success?: boolean; errors?: { username?: string[]; password?: string[]; displayName?: string[]; general?: string[] } }
  | undefined;

export async function createUserAction(state: CreateUserState, formData: FormData): Promise<CreateUserState> {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return { errors: { general: ["ไม่มีสิทธิ์ดำเนินการ"] } };
  }

  const username = (formData.get("username") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";
  const displayName = (formData.get("displayName") as string | null)?.trim() ?? "";
  const role = (formData.get("role") as string | null) === "admin" ? "admin" : "staff";

  type Errs = { username?: string[]; password?: string[]; displayName?: string[]; general?: string[] };
  const errors: Errs = {};
  if (!username || username.length < 3) errors.username = ["ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร"];
  if (!password || password.length < 6) errors.password = ["รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"];
  if (!displayName) errors.displayName = ["กรุณากรอกชื่อแสดง"];
  if (Object.keys(errors).length > 0) return { errors };

  try {
    await createUser({ username, password, displayName, role });
    return { success: true };
  } catch (err) {
    return { errors: { general: [(err as Error).message] } };
  }
}

export async function getAdminUsers() {
  const session = await getSession();
  if (!session || session.role !== "admin") return [];
  return readUsers().map(({ id, username, displayName, role, createdAt }) => ({
    id, username, displayName, role, createdAt,
  }));
}
