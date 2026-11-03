import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/uiSlice";
import PostFormModal from "../post/PostFormModal";
import PostDetailModal from "../post/PostDetailModal";
import LikesModal from "../like/LikesModal";
import EditProfileModal from "../profile/EditProfileModal";

// Redux me jo `name` hai, wahi component yahan khulta hai
const registry = {
  createPost: PostFormModal,
  editPost: PostFormModal,
  postDetail: PostDetailModal,
  likes: LikesModal,
  editProfile: EditProfileModal,
};

export default function ModalHost() {
  const modals = useSelector((s) => s.ui.modals);
  const dispatch = useDispatch();

  // Esc = sabse upar wala modal band; modal khula ho to page scroll band
  useEffect(() => {
    if (!modals.length) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !document.querySelector(".swal2-container")) dispatch(closeModal());
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modals.length, dispatch]);

  return modals.map((m, i) => {
    const Component = registry[m.name];
    return <Component key={i} {...m.data} />;
  });
}
