document.addEventListener("DOMContentLoaded", () => {
  const scrollNavs = document.querySelectorAll(".topbar-scroll-nav");
  const rightLinks = document.querySelectorAll(".topbarright");

  if (!scrollNavs.length && !rightLinks.length) {
    return;
  }

  const updateTopbarNav = () => {
    const shouldHide = window.scrollY > 64;
    const shouldHideScrollNav = shouldHide && window.location.pathname === "/dual-input/";

    scrollNavs.forEach(nav => {
      nav.classList.toggle("is-hidden", shouldHideScrollNav);
    });

    rightLinks.forEach(link => {
      link.classList.toggle("is-hidden", shouldHide);
    });
  };

  updateTopbarNav();
  window.addEventListener("scroll", updateTopbarNav, { passive: true });
});
