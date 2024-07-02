"use client";
 
import { updatePost } from "@/actions/actions";
import { useFormState } from "react-dom";
import type { Post } from "@prisma/client";
 
const UpdateForm = ({ post }: { post: Post }) => {
    const UpdatePostWithId = updatePost.bind(null, post.id);
    const [state, formAction] = useFormState(UpdatePostWithId, null);
 
    return (
    <div className="flex flex-col max-w-[400px] mx-auto gap-2 my-10">
      <form action={formAction}>
        <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Title..."
            defaultValue={post.title}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.title}</p>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Description
          </label>
            <textarea
                name="body"
                id="body"
                placeholder="Body content for new post"
                className="textarea textarea-primary textarea-xs w-full max-w-xs"
                rows={6}
                defaultValue={post.body}
                required
            />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.body}</p>
          </div>
        </div>

        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};
 
export default UpdateForm;