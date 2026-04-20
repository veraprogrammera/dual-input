document.addEventListener("DOMContentLoaded", () => {
  const scrollNavs = document.querySelectorAll(".topbar-scroll-nav");
  const rightLinks = document.querySelectorAll(".topbarright");
  const topbar = document.querySelector(".topbar");
  const frontInfoMore = document.querySelectorAll(".front-info-more");
  let frontInfoCollapsed = null;
  let lastScrollY = window.scrollY;

  if (!topbar && !scrollNavs.length && !rightLinks.length && !frontInfoMore.length) {
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
    const currentScrollY = window.scrollY;
    const shouldHide = currentScrollY > 80 && currentScrollY > lastScrollY;

    if (topbar) {
      topbar.classList.toggle("is-hidden", shouldHide);
    }

    lastScrollY = currentScrollY;
  };

  updateFrontInfoDetails();
  updateTopbarNav();
  window.addEventListener("resize", updateFrontInfoDetails);
  window.addEventListener("scroll", updateTopbarNav, { passive: true });
});
