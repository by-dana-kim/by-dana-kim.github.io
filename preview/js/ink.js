/* ============================================================
   Ink — where the pointer rests, ink bleeds into the paper.
   No line, no trail: a blot starts after a short dwell, spreads
   with an uneven edge while the pointer stays, and fades after
   it leaves. Fine-pointer devices only; off under reduced motion.
   ============================================================ */
(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const DWELL = 320;        // ms the pointer must rest before ink starts
  const GROW_TAU = 1600;    // ms time-constant of the spread (fast first, then slow)
  const R_MAX = 150;        // px, largest radius after a long rest
  const FADE = 3200;        // ms to fade once the pointer leaves
  const STILL = 5;          // px of movement that still counts as resting
  const ALPHA = 0.13;       // peak opacity at the blot's core
  const COLOR = "14, 90, 58";

  const canvas = document.createElement("canvas");
  canvas.className = "trace";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener("resize", size);

  const blots = [];           // { x, y, t0, tEnd, lobes }
  let pointer = null;         // { x, y, since }
  let active = null;          // the blot still growing under the pointer
  let raf = null;

  const lobes = () => Array.from({ length: 5 }, () => ({ k: 2 + Math.floor(Math.random() * 5), ph: Math.random() * Math.PI * 2, amp: 0.04 + Math.random() * 0.07 }));

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX, y = e.clientY, now = performance.now();
    if (!pointer || Math.hypot(x - pointer.x, y - pointer.y) > STILL) {
      pointer = { x, y, since: now };
      if (active) { active.tEnd = now; active = null; }   // the pointer moved on: this blot starts to fade
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  const leave = () => { if (active) { active.tEnd = performance.now(); active = null; } pointer = null; };
  document.addEventListener("mouseleave", leave);
  window.addEventListener("blur", leave);
  document.addEventListener("visibilitychange", () => { if (document.hidden) { blots.length = 0; active = null; pointer = null; } });

  // radius at angle a, for a blot of base radius r: an uneven, slowly shifting edge
  function edge(b, a, r, t) {
    let f = 1;
    b.lobes.forEach((l) => { f += l.amp * Math.sin(l.k * a + l.ph + t * 0.00025 * l.k); });
    return r * f;
  }

  function tick() {
    raf = null;
    const now = performance.now();

    // start a blot once the pointer has rested long enough
    if (pointer && !active && now - pointer.since > DWELL) {
      active = { x: pointer.x, y: pointer.y, t0: now, tEnd: null, lobes: lobes() };
      blots.push(active);
      if (blots.length > 8) blots.shift();
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = blots.length - 1; i >= 0; i--) {
      const b = blots[i];
      const grown = (b.tEnd ?? now) - b.t0;
      // keeps bleeding a little after the pointer leaves
      const extra = b.tEnd ? (now - b.tEnd) * 0.012 : 0;
      const r = R_MAX * (1 - Math.exp(-grown / GROW_TAU)) + extra;
      const life = b.tEnd ? 1 - (now - b.tEnd) / FADE : 1;
      if (life <= 0) { blots.splice(i, 1); continue; }
      const rise = Math.min(1, grown / 260);           // soft start
      const alpha = ALPHA * life * rise;
      if (r < 1 || alpha <= 0.002) continue;

      ctx.save();
      ctx.beginPath();
      const N = 72;
      for (let k = 0; k <= N; k++) {
        const a = (k / N) * Math.PI * 2;
        const rr = edge(b, a, r, now);
        const px = b.x + Math.cos(a) * rr, py = b.y + Math.sin(a) * rr;
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
      ctx.clip();
      // ink is densest at the core and feathers out toward the edge
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r * 1.12);
      g.addColorStop(0, `rgba(${COLOR}, ${alpha.toFixed(3)})`);
      g.addColorStop(0.55, `rgba(${COLOR}, ${(alpha * 0.8).toFixed(3)})`);
      g.addColorStop(1, `rgba(${COLOR}, ${(alpha * 0.25).toFixed(3)})`);
      ctx.fillStyle = g;
      ctx.fillRect(b.x - r * 1.3, b.y - r * 1.3, r * 2.6, r * 2.6);
      ctx.restore();
    }

    if (blots.length || (pointer && !active)) raf = requestAnimationFrame(tick);
  }
})();
