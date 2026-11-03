import Swal from "sweetalert2";

// SweetAlert2 ko apni UI classes (uiverse button) ke saath configure kiya hai
const base = Swal.mixin({
  buttonsStyling: false,
  reverseButtons: true,
  customClass: {
    popup: "swal-popup",
    actions: "swal-actions",
    input: "swal-input",
    confirmButton: "uv-btn",
    cancelButton: "uv-btn uv-btn-light",
  },
});

const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
  customClass: { popup: "swal-toast" },
});

export const notify = {
  success: (title) => toast.fire({ icon: "success", title }),
  error: (title) => toast.fire({ icon: "error", title }),
};

/** "Are you sure?" popup -> true / false */
export async function confirmBox({ title, text, confirmText = "Yes" }) {
  const res = await base.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
  });
  return res.isConfirmed;
}

/** Ek line text maangta hai -> string ya null (cancel) */
export async function askText({ title, value = "" }) {
  const res = await base.fire({
    title,
    input: "text",
    inputValue: value,
    showCancelButton: true,
    confirmButtonText: "Save",
    inputValidator: (v) => (!v.trim() ? "This can't be empty" : undefined),
  });
  return res.isConfirmed ? res.value.trim() : null;
}
