import UpdateForm from "@/components/editform";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    console.log(params.id);
    const post = await prisma.post.findUnique({
        where: {
        id: parseInt(params.id),
        },
    });
    if (!post) {
        notFound();
    }
 
    return (
    <div className="max-w-md mx-auto w-full mt-5">
        <h1 className="text-2xl text-center mb-2">Update Post</h1>
        <UpdateForm post={post}/>
    </div>
  );
}