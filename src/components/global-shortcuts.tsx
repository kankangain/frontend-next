"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GlobalShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isAdminShortcut = event.ctrlKey && event.shiftKey && event.code === "KeyA";

      if (!isAdminShortcut) {
        return;
      }

      event.preventDefault();
      router.push("/admin/login");
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}