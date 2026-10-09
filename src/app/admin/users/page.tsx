"use client";
import { useActionState, useEffect, useState } from "react";
import { createUserAction, getAdminUsers } from "@/app/actions/auth";

interface UserRow {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "staff";
  createdAt: string;
}

export default function UsersPage() {
  const [state, action, pending] = useActionState(createUserAction, undefined);
  const [users, setUsers] = useState<UserRow[]>([]);

  async function loadUsers() {
    const data = await getAdminUsers();
    setUsers(data);
  }

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { if (state?.success) loadUsers(); }, [state]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-[#0b1220] mb-1">จัดการผู้ใช้</h1>
      <p className="text-gray-400 text-sm mb-6">สร้าง และดูรายชื่อผู้ใช้งานระบบ</p>

      {/* Create user form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-[#0b1220] mb-4">สร้างผู้ใช้ใหม่</h2>

        {state?.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4 text-green-700 text-sm">
            สร้างผู้ใช้สำเร็จแล้ว
          </div>
        )}
        {state?.errors?.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-red-600 text-sm">
            {state.errors.general[0]}
          </div>
        )}

        <form action={action} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อผู้ใช้ (username)</label>
            <input
              name="username"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9a227] transition"
              placeholder="เช่น staff01"
            />
            {state?.errors?.username && <p className="text-red-500 text-xs mt-1">{state.errors.username[0]}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อแสดง</label>
            <input
              name="displayName"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9a227] transition"
              placeholder="เช่น คุณมด ฝ่ายขาย"
            />
            {state?.errors?.displayName && <p className="text-red-500 text-xs mt-1">{state.errors.displayName[0]}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">รหัสผ่าน</label>
            <input
              name="password"
              type="password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9a227] transition"
              placeholder="อย่างน้อย 6 ตัวอักษร"
            />
            {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">สิทธิ์</label>
            <select
              name="role"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9a227] transition bg-white"
            >
              <option value="staff">Staff — ดู lead ได้</option>
              <option value="admin">Admin — จัดการผู้ใช้ได้</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="bg-[#0b1220] hover:bg-[#1a2540] disabled:opacity-50 text-white rounded-lg px-6 py-2.5 text-sm font-semibold transition"
            >
              {pending ? "กำลังสร้าง..." : "สร้างผู้ใช้"}
            </button>
          </div>
        </form>
      </div>

      {/* User list */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#0b1220] text-sm">ผู้ใช้ทั้งหมด ({users.length})</h2>
        </div>
        {users.length === 0 ? (
          <p className="text-gray-400 text-sm p-6">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {users.map((u) => (
              <div key={u.id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-[#0b1220] text-sm">{u.displayName}</p>
                  <p className="text-xs text-gray-400">@{u.username}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${u.role === "admin" ? "bg-[#0b1220] text-white" : "bg-gray-100 text-gray-600"}`}>
                    {u.role === "admin" ? "Admin" : "Staff"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
