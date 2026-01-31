"use client";

import { signoutAction } from "@/actions/auth.actions";
import { LogOutIcon } from "lucide-react";

export function SignoutButton() {
  return (
    <button
      className="flex items-center gap-3 rounded-lg px-3  text-sm font-medium text-gray-500 transition-all hover:text-gray-900"
      onClick={async () => {
        await signoutAction();
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  );
}
