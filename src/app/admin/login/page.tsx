"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Image from "next/image";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-[#0b1220] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/Maporn.png" alt="Maporn Autogroup" width={80} height={80} className="rounded-2xl" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-white text-xl font-bold text-center mb-1">เข้าสู่ระบบ</h1>
          <p className="text-white/40 text-sm text-center mb-7">Maporn Autogroup · Admin</p>

          {state?.errors?.general && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5 text-red-400 text-sm text-center">
              {state.errors.general[0]}
            </div>
          )}

          <form action={action} className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">ชื่อผู้ใช้</label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c9a227]/60 focus:bg-white/15 transition"
                placeholder="กรอกชื่อผู้ใช้"
              />
              {state?.errors?.username && (
                <p className="text-red-400 text-xs mt-1">{state.errors.username[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c9a227]/60 focus:bg-white/15 transition"
                placeholder="กรอกรหัสผ่าน"
              />
              {state?.errors?.password && (
                <p className="text-red-400 text-xs mt-1">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#c9a227] hover:bg-[#b8911f] disabled:opacity-50 text-[#0b1220] font-bold rounded-lg py-2.5 text-sm transition mt-2"
            >
              {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          Maporn Autogroup · ระบบจัดการภายใน
        </p>
      </div>
    </div>
  );
}
