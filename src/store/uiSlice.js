import { createSlice } from "@reduxjs/toolkit";

// Modals ka stack. Post detail ke upar Likes modal khul sake isliye array hai.
// openModal({ name: "postDetail", data: { postId } })
const uiSlice = createSlice({
  name: "ui",
  initialState: { modals: [] },
  reducers: {
    openModal(state, { payload }) {
      state.modals.push(payload);
    },
    closeModal(state) {
      state.modals.pop();
    },
    closeAllModals(state) {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = uiSlice.actions;
export default uiSlice.reducer;
