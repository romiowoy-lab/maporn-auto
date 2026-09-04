"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function useLeadSubmit() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [leadId, setLeadId] = useState("");

  async function submit(payload: Record<string, unknown>) {
    setState("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        setState("error");
        return false;
      }
      setLeadId(data.id);
      setState("success");
      return true;
    } catch {
      setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
      setState("error");
      return false;
    }
  }

  function reset() {
    setState("idle");
    setErrorMessage("");
    setLeadId("");
  }

  return { state, errorMessage, leadId, submit, reset };
}
