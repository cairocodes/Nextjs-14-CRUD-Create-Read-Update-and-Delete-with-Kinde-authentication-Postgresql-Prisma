"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PostSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(20),
});

export async function createPost(formData: FormData) {

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  console.log(title);
  console.log(body);
  // update database
  await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  // revalidate
  revalidatePath("/posts");
}

export const updatePost = async (
  id: string,
  prevSate: any,
  formData: FormData
) => {
  const validatedFields = PostSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
 
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.post.update({
      data: {
        title: validatedFields.data.title,
        body: validatedFields.data.body,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update" };
  }
  
  revalidatePath("/posts");
  redirect("/posts");
};

export const deletePost = async (id: string) => {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete post" };
  }
 
  revalidatePath("/posts");
};