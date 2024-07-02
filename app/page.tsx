import prisma from "@/lib/db";

import { Suspense } from "react";
import Image from "next/image";

export default async function Home() {
//export default function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await prisma.post.findMany();

  return (
    <main className="text-center pt-32 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        Our Blog
      </h1>
      <Suspense fallback="Loading...">
        
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-3">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
            <Image
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="title"
              width="305"
              height="305"
            />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.body}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
          </li>
        ))}
      </ul>
      </Suspense>
    </main>
  );
}