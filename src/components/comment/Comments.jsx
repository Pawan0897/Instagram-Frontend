import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { commentApi } from "../../api/services";
import { askText, confirmBox, notify } from "../../lib/alert";
import { commentSchema } from "../../lib/schemas";
import { displayName, timeAgo } from "../../lib/format";
import Avatar from "../ui/Avatar";
import { Loader } from "../ui/Loader";

export default function Comments({ postId }) {
  const me = useSelector((s) => s.auth.user);
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["comments", postId] });

  // GET /comment/:postId
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.list(postId),
  });

  // POST /comment
  const addComment = useMutation({ mutationFn: commentApi.create, onSuccess: refresh });

  // PUT /comment
  const editComment = useMutation({
    mutationFn: commentApi.update,
    onSuccess: () => { refresh(); notify.success("Comment updated"); },
  });

  // DELETE /comment/:id
  const deleteComment = useMutation({
    mutationFn: commentApi.remove,
    onSuccess: () => { refresh(); notify.success("Comment deleted"); },
  });

  async function handleEdit(comment) {
    const text = await askText({ title: "Edit comment", value: comment.text });
    if (text) editComment.mutate({ commentId: comment._id, text });
  }

  async function handleDelete(comment) {
    const ok = await confirmBox({ title: "Delete comment?", confirmText: "Delete" });
    if (ok) deleteComment.mutate(comment._id);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-[120px] flex-1 overflow-y-auto px-4 py-3">
        {isLoading && <Loader />}
        {!isLoading && comments.length === 0 && (
          <p className="py-8 text-center text-sm text-mute">No comments yet. Start the conversation.</p>
        )}
        <ul className="space-y-4">
          {comments.map((c) => {
            const mine = c.userId === me._id;
            const name = mine ? "You" : displayName(null, c.userId);
            return (
              <li key={c._id} className="flex gap-3">
                <Avatar name={name} size="sm" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="break-words"><span className="mr-1.5 font-semibold">{name}</span>{c.text}</p>
                  <p className="mt-0.5 flex gap-3 text-xs text-mute">
                    <span>{timeAgo(c.createdAt)}</span>
                    {mine && (
                      <>
                        <button onClick={() => handleEdit(c)} className="font-semibold hover:text-ink">Edit</button>
                        <button onClick={() => handleDelete(c)} className="font-semibold hover:text-heart">Delete</button>
                      </>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Formik
        initialValues={{ text: "" }}
        validationSchema={commentSchema}
        onSubmit={(values, { resetForm }) =>
          addComment.mutate({ postId, text: values.text.trim() }, { onSuccess: () => resetForm() })
        }
      >
        {({ isValid, dirty }) => (
          <Form className="flex items-center gap-2 border-t border-line px-4 py-2">
            <Field name="text" placeholder="Add a comment…" aria-label="Add a comment" autoComplete="off"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm focus:outline-none" />
            <button type="submit" disabled={!dirty || !isValid || addComment.isPending}
              className="text-sm font-semibold text-brand disabled:opacity-40">
              Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
