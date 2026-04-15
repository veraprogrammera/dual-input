document.addEventListener("DOMContentLoaded", () => {
  const scrollNavs = document.querySelectorAll(".topbar-scroll-nav");
  const rightLinks = document.querySelectorAll(".topbarright");
  const frontInfoMore = document.querySelectorAll(".front-info-more");
  let frontInfoCollapsed = null;

  if (!scrollNavs.length && !rightLinks.length && !frontInfoMore.length) {
    return;
  }

  const updateFrontInfoDetails = () => {
    const shouldCollapse = window.matchMedia("(max-width: 980px)").matches;

    if (frontInfoCollapsed === shouldCollapse) {
      return;
    }

    frontInfoCollapsed = shouldCollapse;

    frontInfoMore.forEach(details => {
      if (shouldCollapse) {
        details.removeAttribute("open");
      } else {
        details.setAttribute("open", "");
      }
    });
  };

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

  updateFrontInfoDetails();
  updateTopbarNav();
  window.addEventListener("resize", updateFrontInfoDetails);
  window.addEventListener("scroll", updateTopbarNav, { passive: true });
});
