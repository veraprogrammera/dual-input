document.addEventListener("DOMContentLoaded", () => { /* för annars hade inte .typing line funnits än*/
  const lines = document.querySelectorAll(".typing-line"); /*hämtar alla element med klassen .typing-line och sparar dem i variabeln lines*/
  const trigger = document.querySelector(".tagline"); /*hämtar elementet med klassen .tagline och sparar det i variabeln trigger*/
  const letters = document.querySelectorAll(".letter");

  let started = false;
  let inView = false;

  lines.forEach(line => {
    line.dataset.text = line.textContent;
    line.textContent = ""; /* gör så att texten i elementet blir tom, så att den kan skrivas ut en bokstav i taget senare */
  });

  function typeLine(el, speed = 15) {
    return new Promise(resolve => {
      let i = 0;
      const text = el.dataset.text;

      function type() {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      }

      type();
    });
  }

  function startTyping() {
    if (started) return;
    started = true;

    Promise.all([
      typeLine(lines[0], 40),
      typeLine(lines[1], 40)
    ]);
  }

  const tagline = document.querySelector(".tagline");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      inView = entry.isIntersecting;
    });
  }, { threshold: 1 });

  if (trigger){
    observer.observe(trigger);
  }
  window.addEventListener("scroll", () => {
    if (inView && !started){
      startTyping();
    }
  });

  const topLetters = document.querySelectorAll(".top-line .letter");
  const bottomLetters = document.querySelectorAll(".bottom-line .letter");

  letters.forEach((letter, index) => {
    letter.addEventListener("mouseenter", () => {
      topLetters[index].classList.add("active");
      bottomLetters[index].classList.add("active");
    });

    letter.addEventListener("mouseleave", () => {
      topLetters[index].classList.remove("active");
      bottomLetters[index].classList.remove("active");
    });
  });

  bottomLetters.forEach((letter, index) => {
    letter.addEventListener("mouseenter", () => {
      topLetters[index].classList.add("active");
      bottomLetters[index].classList.add("active");
    });

    letter.addEventListener("mouseleave", () => {
      topLetters[index].classList.remove("active");
      bottomLetters[index].classList.remove("active");
    });
  });

  const cursorLabelLinks = document.querySelectorAll("[data-cursor-label]");

  if (cursorLabelLinks.length) {
    const cursorLabel = document.createElement("div");
    cursorLabel.className = "cursor-link-label";
    document.body.appendChild(cursorLabel);

    function moveCursorLabel(event) {
      const offset = 14;
      const edgePadding = 12;
      const labelRect = cursorLabel.getBoundingClientRect();
      let left = event.clientX + offset;
      let top = event.clientY + offset;

      if (left + labelRect.width > window.innerWidth - edgePadding) {
        left = event.clientX - labelRect.width - offset;
      }

      if (top + labelRect.height > window.innerHeight - edgePadding) {
        top = event.clientY - labelRect.height - offset;
      }

      cursorLabel.style.left = `${Math.max(edgePadding, left)}px`;
      cursorLabel.style.top = `${Math.max(edgePadding, top)}px`;
    }

    cursorLabelLinks.forEach(link => {
      link.addEventListener("pointerenter", event => {
        cursorLabel.textContent = link.dataset.cursorLabel;
        cursorLabel.classList.add("visible");
        moveCursorLabel(event);
      });

      link.addEventListener("pointermove", moveCursorLabel);

      link.addEventListener("pointerdown", event => {
        cursorLabel.textContent = link.dataset.cursorLabel;
        cursorLabel.classList.add("visible");
        moveCursorLabel(event);
      });

      link.addEventListener("pointerleave", () => {
        cursorLabel.classList.remove("visible");
      });
    });
  }

});
