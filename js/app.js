(() => {
  const $ = (s) => document.querySelector(s);
  const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- isi teks dari config ---------- */
  document.title = CONFIG.siteTitle;
  document.querySelectorAll("[data-text]").forEach((el) => {
    el.textContent = get(CONFIG, el.dataset.text);
  });
  $("#modalText").textContent = CONFIG.pinError.message;
  $("#modalBtn").textContent = CONFIG.pinError.button;

  const L = CONFIG.letter;
  $("#letterGreeting").textContent = L.greeting;
  $("#letterClosing").textContent = L.closing;
  $("#letterSignature").textContent = L.signature;
  L.paragraphs.forEach((t) => {
    const p = document.createElement("p");
    p.className = "para";
    p.textContent = t;
    $("#letterBody").appendChild(p);
  });

  CONFIG.final.gifts.forEach((g) => {
    const fig = document.createElement("figure");
    fig.className = "gift";
    const img = document.createElement("img");
    img.src = g.image;
    img.alt = g.alt;
    img.loading = "lazy";
    const cap = document.createElement("figcaption");
    cap.textContent = g.caption;
    fig.append(img, cap);
    $("#gifts").appendChild(fig);
  });

  /* ---------- navigasi antarhalaman ---------- */
  let current = $("#landing");
  function go(id) {
    const next = document.getElementById(id);
    if (!next || next === current) return;
    current.classList.remove("active");
    next.classList.add("active");
    next.scrollTop = 0;
    current = next;
  }

  /* ---------- hati melayang ---------- */
  function spawnHeart(container, opts = {}) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "♥";
    const dur = opts.dur || 9 + Math.random() * 8;
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = 10 + Math.random() * 18 + "px";
    h.style.animationDuration = dur + "s";
    h.style.animationDelay = (opts.delay ?? Math.random() * 6) + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), (dur + 8) * 1000);
  }
  const bg = $("#bgHearts");
  if (!reduceMotion) {
    for (let i = 0; i < 12; i++) spawnHeart(bg);
    setInterval(() => spawnHeart(bg), 1800);
  }

  /* ---------- 1. landing ---------- */
  $("#startBtn").addEventListener("click", () => {
    go("pin");
    setTimeout(() => inputs[0].focus(), 500);
  });

  /* ---------- 2. PIN ---------- */
  const PIN = String(CONFIG.pinCode);
  const row = $("#pinRow");
  const inputs = [];
  for (let i = 0; i < PIN.length; i++) {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.inputMode = "numeric";
    inp.maxLength = 1;
    inp.autocomplete = "off";
    inp.setAttribute("aria-label", "Digit " + (i + 1));
    row.appendChild(inp);
    inputs.push(inp);

    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/\D/g, "").slice(0, 1);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && i > 0) inputs[i - 1].focus();
      else if (e.key === "ArrowLeft" && i > 0) inputs[i - 1].focus();
      else if (e.key === "ArrowRight" && i < inputs.length - 1) inputs[i + 1].focus();
      else if (e.key === "Enter") checkPin();
    });
    inp.addEventListener("focus", () => inp.select());
    inp.addEventListener("paste", (e) => {
      e.preventDefault();
      const d = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, inputs.length);
      d.split("").forEach((c, k) => (inputs[k].value = c));
      inputs[Math.min(d.length, inputs.length - 1)].focus();
    });
  }

  const modal = $("#modal");
  function checkPin() {
    const val = inputs.map((i) => i.value).join("");
    if (val === PIN) {
      go("letter");
      startMusic();
    } else {
      row.classList.remove("shake");
      void row.offsetWidth;
      row.classList.add("shake");
      modal.hidden = false;
      $("#modalBtn").focus();
    }
  }
  $("#pinBtn").addEventListener("click", checkPin);
  $("#modalBtn").addEventListener("click", () => {
    modal.hidden = true;
    inputs.forEach((i) => (i.value = ""));
    inputs[0].focus();
  });

  /* ---------- 3. surat + musik ---------- */
  const bgm = $("#bgm");
  bgm.src = CONFIG.music.src;
  bgm.volume = 0.7;
  const musicBtn = $("#musicBtn");
  function renderMusic() {
    const playing = !bgm.paused;
    musicBtn.setAttribute("aria-pressed", String(playing));
    $("#musicLabel").textContent = playing ? CONFIG.music.pauseLabel : CONFIG.music.playLabel;
  }
  function startMusic() {
    // dipanggil dari klik pengguna, jadi lolos batasan autoplay
    bgm.play().then(renderMusic).catch(renderMusic);
  }
  musicBtn.addEventListener("click", () => {
    if (bgm.paused) bgm.play().catch(() => {});
    else bgm.pause();
  });
  bgm.addEventListener("play", renderMusic);
  bgm.addEventListener("pause", renderMusic);
  renderMusic();

  $("#continueBtn").addEventListener("click", () => go("proposal"));

  /* ---------- 4. proposal ---------- */
  const noBtn = $("#noBtn");
  const yesBtn = $("#yesBtn");
  let spacer = null;
  let lock = false;

  function dodge(px, py) {
    if (lock) return;
    lock = true;
    setTimeout(() => (lock = false), 260);

    const w = noBtn.offsetWidth, h = noBtn.offsetHeight;
    if (!noBtn.classList.contains("floating")) {
      const r = noBtn.getBoundingClientRect();
      spacer = document.createElement("span");
      spacer.className = "spacer";
      spacer.style.width = w + "px";
      spacer.style.height = h + "px";
      noBtn.parentNode.insertBefore(spacer, noBtn);
      noBtn.style.left = r.left + "px";
      noBtn.style.top = r.top + "px";
      noBtn.classList.add("floating");
      void noBtn.offsetWidth;
    }

    const pad = 14;
    const maxX = innerWidth - w - pad, maxY = innerHeight - h - pad;
    const yes = yesBtn.getBoundingClientRect();
    const cur = noBtn.getBoundingClientRect();
    const fx = px ?? cur.left + w / 2, fy = py ?? cur.top + h / 2;
    let x = cur.left, y = cur.top;

    for (let i = 0; i < 40; i++) {
      const tx = pad + Math.random() * Math.max(0, maxX - pad);
      const ty = pad + Math.random() * Math.max(0, maxY - pad);
      const far = Math.hypot(tx + w / 2 - fx, ty + h / 2 - fy) > 140;
      const hitsYes = tx < yes.right + 20 && tx + w > yes.left - 20 && ty < yes.bottom + 20 && ty + h > yes.top - 20;
      if (far && !hitsYes) { x = tx; y = ty; break; }
    }
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }

  // mouse mendekat
  document.addEventListener("pointermove", (e) => {
    if (current.id !== "proposal" || e.pointerType !== "mouse") return;
    const r = noBtn.getBoundingClientRect();
    const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
    if (d < Math.max(r.width, r.height) / 2 + 55) dodge(e.clientX, e.clientY);
  });
  // sentuh / klik / keyboard
  noBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); dodge(e.clientX, e.clientY); });
  noBtn.addEventListener("click", (e) => { e.preventDefault(); dodge(); });
  addEventListener("resize", () => {
    if (noBtn.classList.contains("floating")) { lock = false; dodge(); }
  });

  yesBtn.addEventListener("click", () => {
    noBtn.style.display = "none";
    go("final");
    if (!reduceMotion) for (let i = 0; i < 30; i++) spawnHeart(bg, { dur: 4 + Math.random() * 3, delay: Math.random() * 1.2 });
  });
})();
