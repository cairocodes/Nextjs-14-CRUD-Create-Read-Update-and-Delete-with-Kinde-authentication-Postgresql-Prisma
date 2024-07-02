import { deletePost } from "@/actions/actions";

export const DeleteButton = ({ id }: { id: string }) => {
  const DeletedeletePostWithId = deletePost.bind(null, id);
  return (
    <form action={DeletedeletePostWithId}>
      <button className="btn btn-error">
        Delete
      </button>
    </form>
  );
};