"use client";

import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
    >
      Sign In
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
    >
      Sign Out
    </button>
  );
}