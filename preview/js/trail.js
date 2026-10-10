/* ============================================================
   Cursor trace — a thin line and soft points that linger where the
   pointer has been and fade like a memory of the path.
   Fine-pointer devices only; off under prefers-reduced-motion.
   ============================================================ */
(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const LINE_LIFE = 2600;   // ms a stroke segment stays visible
  const DOT_LIFE = 4200;    // ms a point lingers
  const DOT_EVERY = 34;     // px of travel between points
  const COLOR = "14, 90, 58"; // deep green, rgb

  const canvas = document.createElement("canvas");
  canvas.className = "trace";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let dpr = 1;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener("resize", size);

  const pts = [];   // { x, y, t }
  const dots = [];  // { x, y, t, r, seed }
  let lastDot = null;
  let raf = null;
  let last = null;

  function addPoint(x, y) {
    const t = performance.now();
    if (last && Math.hypot(x - last.x, y - last.y) < 1.5) return;
    pts.push({ x, y, t });
    last = { x, y };
    if (!lastDot || Math.hypot(x - lastDot.x, y - lastDot.y) >= DOT_EVERY) {
      dots.push({ x, y, t, r: 5 + Math.random() * 9, seed: Math.random() });
      lastDot = { x, y };
    }
    if (!raf) raf = requestAnimationFrame(draw);
  }
  window.addEventListener("mousemove", (e) => addPoint(e.clientX, e.clientY), { passive: true });
  // the page scrolls under the pointer: treat the stroke as drawn on the viewport, so nothing to do
  document.addEventListener("visibilitychange", () => { if (document.hidden) { pts.length = 0; dots.length = 0; } });

  function draw() {
    raf = null;
    const now = performance.now();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // points first (under the line): soft radial "memory" marks
    while (dots.length && now - dots[0].t > DOT_LIFE) dots.shift();
    dots.forEach((d) => {
      const a = 1 - (now - d.t) / DOT_LIFE;
      const grow = 1 + (1 - a) * 0.6;              // they spread a little as they fade
      const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * grow);
      g.addColorStop(0, `rgba(${COLOR}, ${(0.16 * a).toFixed(3)})`);
      g.addColorStop(1, `rgba(${COLOR}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * grow, 0, Math.PI * 2);
      ctx.fill();
    });

    // the line: newest part strongest and thickest, tapering into the past
    while (pts.length && now - pts[0].t > LINE_LIFE) pts.shift();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i];
      const a = 1 - (now - p1.t) / LINE_LIFE;
      ctx.strokeStyle = `rgba(${COLOR}, ${(0.55 * a * a).toFixed(3)})`;
      ctx.lineWidth = 0.4 + 1.3 * a;
      ctx.beginPath();
      if (i >= 2) {
        const pm = pts[i - 2];
        const cx = (pm.x + p0.x) / 2, cy = (pm.y + p0.y) / 2;
        const nx = (p0.x + p1.x) / 2, ny = (p0.y + p1.y) / 2;
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(p0.x, p0.y, nx, ny);
      } else {
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
      }
      ctx.stroke();
    }

    if (pts.length || dots.length) raf = requestAnimationFrame(draw);
  }
})();
