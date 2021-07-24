export function scrollToTop(smooth=false) {
  document.querySelector('main').scrollTo({
    top: 0,
    behavior: smooth === true ? "smooth" : "auto"
  });
}

export function scrollFocus(sectionId, smooth=false) {
  const navbar = document.querySelector('header');
  const main = document.querySelector('main');
  const section = document.getElementById(sectionId);
  scrollToTop();
  if (sectionId) {
    try {
      main.scrollTo({
        top: section.getBoundingClientRect().top - navbar.getBoundingClientRect().height - 24,
        behavior: smooth === true ? "smooth" : "auto"
      });
    } catch (e) {
      console.warn(e);
    }
  }
}
