document.addEventListener("DOMContentLoaded", () => {
    const dualStage = document.querySelector('.animation-section .dual-stage') || document.querySelector('.dual-stage');
    if (!dualStage) return;

    const rows = Array.from(dualStage.querySelectorAll('.text-line'));
    const columns = [];
    const frames = Array.from(dualStage.querySelectorAll('.frame'));
    const output = Array.from(document.querySelectorAll('.key-input-screen'));

    let lastUserInteraction = 0;

    if (!frames.length || !output.length) return;

    function writeLabel(label) {
      if (!label)return;
        output.forEach(output => {
            output.textContent += label;
        });
      }

    function pressFrame(frame){
        if (!frame) return;

        frame.classList.add('pressed');

        const label = frame.querySelector('.text')?.textContent?.trim();
        writeLabel(label);

        setTimeout(() => {
            frame.classList.remove('pressed');
        }, 160);
    }

    frames.forEach(frame => {
    frame.addEventListener("click", event => {
      event.preventDefault();
      pressFrame(frame);
      lastUserInteraction = Date.now();
    });
  });



   rows.forEach(row => {
    const frames = Array.from(row.querySelectorAll('.frame'));
    frames.forEach((frame, i) => {
      columns[i] = columns[i] || [];
      columns[i].push(frame);
    });
  });

  columns.forEach(col => {
    col.forEach(frame => {
      frame.addEventListener("mouseenter", () => {
        col.forEach(f => f.classList.add("active"));
      });

      frame.addEventListener("mouseleave", () => {
        col.forEach(f => f.classList.remove("active"));
      });
    });
  });

  // --- Auto-pressing behavior -------------------------------------------------

  const pauseAfterUserClickMs = 300; // pause auto-pressing after manual click
  const slowDelay = 1500; // idle tempo (ms)
  const fastDelay = 70; // hover tempo (ms)
  let currentDelay = slowDelay;
  let autoTimer = null;

  function scheduleNextAuto() {
    autoTimer = setTimeout(runAutoPress, currentDelay + Math.random() * 300);
  }

  function runAutoPress() {
    if (Date.now() - lastUserInteraction < pauseAfterUserClickMs) {
      scheduleNextAuto();
      return;
    }

    if (!frames.length) {
      scheduleNextAuto();
      return;
    }

    const idx = Math.floor(Math.random() * frames.length);
    const frame = frames[idx];

    pressFrame(frame);

    scheduleNextAuto();
  }

  dualStage.addEventListener('mouseenter', () => { 
    currentDelay = fastDelay; 
});
  dualStage.addEventListener('mouseleave', () => { 
    currentDelay = slowDelay; 
});

  scheduleNextAuto();});