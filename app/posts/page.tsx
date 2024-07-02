import PostsList from "@/components/posts-list";
import { Suspense } from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Page() {

  // auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">All posts</h1>
      <span className="btn btn-info">
          <Link href="/create-post">Create post</Link>
      </span>
      <span className="btn btn-error"><LogoutLink>Log out</LogoutLink></span>

      <Suspense fallback="Loading...">
        <PostsList />
      </Suspense>
    </main>
  );
}