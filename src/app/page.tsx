"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session)

  return (
    <main>
      <h1>google login</h1>
      <button onClick={() => signIn("google")}>sign in</button>
      <div>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    </main>
  );
}
