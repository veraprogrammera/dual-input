document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll("[data-signature-key]");
  const output = document.getElementById("signatureUseCaseOutput");

  if (!keys.length || !output) return;

  let text = "";
  const demoSequence = ["D", "U", "O", " ", "I", "N", "P", "U", "T", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE", "BACKSPACE"];

  function render() {
    output.textContent = text;
  }

  function handleKey(value) {
    if (value === "BACKSPACE") {
      text = text.slice(0, -1);
    } else {
      text += value;
    }

    render();
  }

  function pressVisualKey(value) {
    const matchingKeys = document.querySelectorAll(`[data-signature-key="${value}"]`);

    if (!matchingKeys.length) return;

    const key = matchingKeys[Math.floor(Math.random() * matchingKeys.length)];
    key.classList.add("pressed");

    setTimeout(() => {
      key.classList.remove("pressed");
    }, 150);
  }

  keys.forEach(key => {
    key.addEventListener("click", () => {
      const value = key.dataset.signatureKey;
      handleKey(value);
      key.classList.add("pressed");

      setTimeout(() => {
        key.classList.remove("pressed");
      }, 150);
    });
  });

  let index = 0;

  setInterval(() => {
    const value = demoSequence[index];
    handleKey(value);
    pressVisualKey(value);

    index++;

    if (index >= demoSequence.length) {
      index = 0;
    }
  }, 200);

  render();
});
