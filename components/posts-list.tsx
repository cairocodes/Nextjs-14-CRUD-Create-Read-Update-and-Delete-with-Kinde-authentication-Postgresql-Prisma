import prisma from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/delete";

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await prisma.post.findMany();

  return (
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => (
            <tr key={post.id} className="bg-white border-b">
                <td className="py-3 px-6">{post.id}</td>
                <td className="py-3 px-6">{post.title}</td>
                <td className="py-3 px-6">{post.body}</td>
                <td className="flex justify-center gap-1 py-3">
                    <button className="btn btn-info">
                      <Link href={`/posts/${post.id}`}>View</Link>
                    </button>
                    <Link
                        href={`/edit/${post.id}`} 
                        className="btn btn-info"
                        >
                        Edit
                    </Link>
                    <DeleteButton id={post.id} />
                </td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}