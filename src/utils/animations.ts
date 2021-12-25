export const animateBackgroundSuccess = (ref: HTMLDivElement | null) => {
  if (ref) {
    ref.classList.remove("success-bg");
    // trick to trigger reflow
    let _ = ref.offsetWidth;
    ref.classList.add("success-bg");
  }
};

export const animateBackgroundError = (ref: HTMLDivElement | null) => {
    if (ref) {
      ref.classList.remove("error-bg");
      // trick to trigger reflow
      let _ = ref.offsetWidth;
      ref.classList.add("error-bg");
    }
  };
