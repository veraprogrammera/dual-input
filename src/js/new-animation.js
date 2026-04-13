document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".screen-button");
  const leftOutput = document.getElementById("sharedOutputLeft");
  const rightOutput = document.getElementById("sharedOutputRight");

  let sharedText = "";

  function renderSharedText() {
    leftOutput.textContent = sharedText;
    rightOutput.textContent = sharedText;
  }

  function handleKeyPress(value) {
    if (value === "BACKSPACE") {
      sharedText = sharedText.slice(0, -1);
    } else {
      sharedText += value;
    }
    renderSharedText();
  }

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const value = key.dataset.key;
      handleKeyPress(value);

      key.classList.add("pressed");
      setTimeout(() => {
        key.classList.remove("pressed");
      }, 150);
    });
  });

  function pressVisualKey(value) {
    const matchingKeys = document.querySelectorAll(`[data-key="${value}"]`);

    if (!matchingKeys.length) return;

    const randomIndex = Math.floor(Math.random() * matchingKeys.length);
    const randomKey = matchingKeys[randomIndex];

    randomKey.classList.add("pressed");

    setTimeout(() => {
      randomKey.classList.remove("pressed");
    }, 150);
  }

  const demoSequence = ["D", "U", "A", "L", " ", "I", "N", "P", "U", "T", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE"];

  let i = 0;

  setInterval(() => {
    const value = demoSequence[i];

    handleKeyPress(value);
    pressVisualKey(value);

    i++;

    if (i >= demoSequence.length) {
      i = 0;
    }
  }, 200);

  renderSharedText();
});