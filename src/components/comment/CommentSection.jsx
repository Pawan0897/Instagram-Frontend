import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAddComment, useComments, useDeleteComment, useEditComment } from "../../hooks/queries";
import { displayName, timeAgo } from "../../utils";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import { Skeleton } from "../ui/States";

function CommentRow({ comment, postId, mine }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const edit = useEditComment(postId, { onSuccess: () => setEditing(false) });
  const del = useDeleteComment(postId);
  const name = mine ? "You" : displayName(null, comment.userId);

  return (
    <li className="group flex gap-3">
      <Avatar name={name} size="xs" />
      <div className="min-w-0 flex-1">
        {editing ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) edit.mutate({ commentId: comment._id, text: text.trim() });
            }}
          >
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-9 min-w-0 flex-1 rounded-lg border border-line px-3 text-sm focus:border-brand focus:outline-none"
            />
            <button type="submit" disabled={edit.isPending} className="text-sm font-semibold text-brand disabled:opacity-50">
              Save
            </button>
            <button type="button" onClick={() => { setEditing(false); setText(comment.text); }} className="text-sm text-mute">
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p className="text-sm leading-snug">
              <span className="mr-1.5 font-semibold">{name}</span>
              <span className="break-words">{comment.text}</span>
            </p>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-mute">
              <span>{timeAgo(comment.createdAt)}</span>
              {mine && (
                <span className="flex gap-3 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  <button onClick={() => setEditing(true)} className="font-medium hover:text-ink">Edit</button>
                  <button onClick={() => del.mutate(comment._id)} disabled={del.isPending} className="font-medium hover:text-heart">
                    Delete
                  </button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default function CommentSection({ postId, className = "" }) {
  const { user } = useAuth();
  const { data: comments = [], isLoading } = useComments(postId);
  const [text, setText] = useState("");
  const add = useAddComment(postId, { onSuccess: () => setText("") });

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {isLoading && <Skeleton className="h-10 w-full" />}
        {!isLoading && comments.length === 0 && (
          <p className="py-6 text-center text-sm text-mute">No comments yet. Start the conversation.</p>
        )}
        <ul className="space-y-3.5">
          {comments.map((c) => (
            <CommentRow key={c._id} comment={c} postId={postId} mine={String(c.userId) === String(user?._id)} />
          ))}
        </ul>
      </div>

      <form
        className="flex items-center gap-2 border-t border-line px-4 py-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) add.mutate({ postId, text: text.trim() });
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          aria-label="Add a comment"
          className="h-10 min-w-0 flex-1 bg-transparent text-sm placeholder:text-mute focus:outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim() || add.isPending}
          className="flex items-center gap-1 text-sm font-semibold text-brand disabled:opacity-40"
        >
          <Icon name="send" className="h-4 w-4" /> Post
        </button>
      </form>
    </div>
  );
}
