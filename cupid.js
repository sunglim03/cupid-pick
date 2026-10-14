// 큐피드 꾸미기: 활을 든 아기 천사 그림 + 하트 화살 마우스 커서

const CUPID_SVG = `
<svg class="cupid" viewBox="0 0 120 120" role="img" aria-label="활을 든 아기 큐피드">
  <!-- 날개 -->
  <path d="M46 62 C18 34 6 66 22 74 C10 80 26 92 44 78 Z" fill="#FFFFFF" stroke="#F4B6C2" stroke-width="2"/>
  <path d="M74 62 C102 34 114 66 98 74 C110 80 94 92 76 78 Z" fill="#FFFFFF" stroke="#F4B6C2" stroke-width="2"/>
  <path d="M30 60 C26 66 26 70 32 72 M90 60 C94 66 94 70 88 72" stroke="#F4B6C2" stroke-width="1.5" fill="none"/>
  <!-- 다리 -->
  <ellipse cx="52" cy="100" rx="7" ry="9" fill="#FFD9C2"/>
  <ellipse cx="68" cy="100" rx="7" ry="9" fill="#FFD9C2"/>
  <!-- 몸 -->
  <ellipse cx="60" cy="80" rx="18" ry="19" fill="#FFD9C2"/>
  <path d="M43 88 Q60 100 77 88 L76 96 Q60 106 44 96 Z" fill="#FF8FA3"/>
  <path d="M46 70 L76 90" stroke="#FF5A6E" stroke-width="4" stroke-linecap="round"/>
  <!-- 활 -->
  <path d="M30 44 Q10 74 30 104" stroke="#C07A3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <line x1="30" y1="44" x2="30" y2="104" stroke="#8B6A55" stroke-width="1"/>
  <!-- 화살 -->
  <line x1="24" y1="76" x2="96" y2="76" stroke="#C07A3A" stroke-width="2.5"/>
  <path d="M22 70 L30 76 L22 82 Z" fill="#FF8A5B"/>
  <path d="M104 76 c-3 -2 -8 -5 -8 -9 c0 -3 2 -5 4 -5 c2 0 3 1 4 3 c1 -2 2 -3 4 -3 c2 0 4 2 4 5 c0 4 -5 7 -8 9 Z" transform="rotate(90 104 70)" fill="#FF5A6E"/>
  <!-- 손 -->
  <circle cx="33" cy="76" r="5" fill="#FFD9C2"/>
  <circle cx="50" cy="76" r="5" fill="#FFD9C2"/>
  <!-- 머리 -->
  <circle cx="60" cy="44" r="20" fill="#FFD9C2"/>
  <circle cx="48" cy="28" r="7" fill="#F5C26B"/><circle cx="58" cy="24" r="8" fill="#F5C26B"/>
  <circle cx="69" cy="26" r="7" fill="#F5C26B"/><circle cx="76" cy="33" r="5" fill="#F5C26B"/>
  <circle cx="43" cy="35" r="5" fill="#F5C26B"/>
  <path d="M51 46 Q54 42 57 46 M63 46 Q66 42 69 46" stroke="#5B3A29" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="49" cy="52" rx="4" ry="2.4" fill="#FF9AA8" opacity=".7"/>
  <ellipse cx="71" cy="52" rx="4" ry="2.4" fill="#FF9AA8" opacity=".7"/>
  <path d="M55 54 Q60 59 65 54" stroke="#C0505F" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`;

// 하트 화살촉 커서: 화살촉 끝이 마우스 위치, 움직이는 방향으로 회전
(function heartArrowCursor() {
  if (!window.matchMedia || !matchMedia("(pointer: fine)").matches) return;  // 터치 기기는 그대로

  const style = document.createElement("style");
  style.textContent = `
    html.arrow-cursor, html.arrow-cursor * { cursor: none !important; }
    html.arrow-cursor input, html.arrow-cursor textarea { cursor: text !important; }
    .heart-arrow { position: fixed; left: 0; top: 0; width: 0; height: 0; pointer-events: none; z-index: 9999; }
    .heart-arrow svg { position: absolute; left: -60px; top: -12px; width: 60px; height: 24px; overflow: visible;
                       filter: drop-shadow(0 2px 3px rgba(80, 20, 40, .25)); transition: transform .12s; }
    .heart-arrow.press svg { transform: translateX(-5px) scale(.92); }`;
  document.head.appendChild(style);

  const el = document.createElement("div");
  el.className = "heart-arrow";
  el.innerHTML = `
    <svg viewBox="0 0 60 24">
      <path d="M0 5 L10 12 L0 19 L4 12 Z" fill="#FF8A5B"/>
      <path d="M6 5 L16 12 L6 19 L10 12 Z" fill="#FFB199"/>
      <line x1="8" y1="12" x2="46" y2="12" stroke="#B0703A" stroke-width="2.5" stroke-linecap="round"/>
      <path transform="translate(39 24) rotate(-90)"
            d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4 7 4c2.2 0 3.8 1.2 5 3 1.2-1.8 2.8-3 5-3 4 0 6.5 4.5 4.5 8.5C19 16.65 12 21 12 21z"
            fill="#FF5A6E"/>
    </svg>`;
  document.body.appendChild(el);
  document.documentElement.classList.add("arrow-cursor");

  let x = -100, y = -100, angle = -135, target = -135, lastX = null, lastY = null;
  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX; y = e.clientY;
    if (lastX !== null) {
      const dx = x - lastX, dy = y - lastY;
      if (dx * dx + dy * dy > 9) target = Math.atan2(dy, dx) * 180 / Math.PI;  // 3px 이상 움직일 때만 방향 갱신
    }
    lastX = x; lastY = y;
  });
  addEventListener("pointerdown", () => el.classList.add("press"));
  addEventListener("pointerup", () => el.classList.remove("press"));
  document.addEventListener("mouseleave", () => { x = y = -100; });

  (function frame() {
    let diff = ((target - angle + 540) % 360) - 180;  // 가장 가까운 방향으로 부드럽게 회전
    angle += diff * 0.2;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    requestAnimationFrame(frame);
  })();
})();
