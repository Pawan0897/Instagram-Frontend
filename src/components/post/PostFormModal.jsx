import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { postApi } from "../../api/services";
import { closeModal } from "../../store/uiSlice";
import { notify } from "../../lib/alert";
import { postSchema } from "../../lib/schemas";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import Modal from "../ui/Modal";
import ImageField from "./ImageField";

// Create aur Edit dono: postId mile to edit mode.
export default function PostFormModal({ postId }) {
  const isEdit = Boolean(postId);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Edit me caption prefill ke liye (feed API caption nahi deti) -> GET /post/:id
  const { data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postApi.byId(postId),
    enabled: isEdit,
  });

  // POST /post/create-post  ya  PUT /post/:id  (multipart)
  const save = useMutation({
    mutationFn: (values) => (isEdit ? postApi.update({ id: postId, ...values }) : postApi.create(values)),
    onSuccess: (res) => {
      notify.success(res.message);
      ["feed", "myPosts", "post"].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      dispatch(closeModal());
    },
  });

  return (
    <Modal title={isEdit ? "Edit post" : "New post"}>
      <Formik
        enableReinitialize
        initialValues={{ file: null, caption: post?.caption || "" }}
        validationSchema={postSchema}
        onSubmit={(values) => save.mutate({ ...values, caption: values.caption.trim() })}
      >
        <Form className="space-y-4 p-4">
          <ImageField name="file" current={post?.post} />
          <FormInput name="caption" as="textarea" rows={3} placeholder="Write a caption…" />
          {isEdit && <p className="text-xs text-mute">Choose a new photo only if you want to replace the current one.</p>}
          <Button type="submit" full loading={save.isPending}>{isEdit ? "Save changes" : "Share"}</Button>
        </Form>
      </Formik>
    </Modal>
  );
}
