export function scrollFocus(sectionId) {
  const navbar = document.querySelector('header');
  const main = document.querySelector('main');
  const section = document.getElementById(sectionId);
  main.scrollTo(0, 0);
  if (sectionId) {
    try {
      main.scrollTo(0, section.getBoundingClientRect().top - navbar.getBoundingClientRect().height - 24);
    } catch (e) {
      console.warn(e);
    }
  }
}

export function scrollToTop() {
  document.querySelector('main').scrollTo(0, 0);
}
