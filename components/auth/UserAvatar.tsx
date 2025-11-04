import { auth } from "@/lib/auth";
import Image from "next/image";

export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div className="text-sm">
        <p className="font-medium">{session.user.name}</p>
        <p className="text-gray-500">{session.user.email}</p>
      </div>
    </div>
  );
}