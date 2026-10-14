// 프로필 이미지: 성별 + 외모 스타일로 일러스트 아바타(SVG)를 그린다
// 사용법: makeAvatar(profile) → <svg> 문자열

const STYLE_LOOK = {
  청순:   { bg: "#E3F0FB", hair: "#1F1A17", outfit: "#FFFFFF", femaleHair: "long" },
  댄디:   { bg: "#E6E9F0", hair: "#2B2220", outfit: "#2F3E5C", femaleHair: "long" },
  귀여움: { bg: "#FFF1D6", hair: "#6B4226", outfit: "#FFC857", femaleHair: "bob" },
  스포티: { bg: "#DDF5E6", hair: "#3A2A1F", outfit: "#2BB673", femaleHair: "bob" },
  시크:   { bg: "#E4E4E4", hair: "#111111", outfit: "#1E1E1E", femaleHair: "long" },
  캐주얼: { bg: "#FDE8DF", hair: "#5A3B28", outfit: "#7FA7D9", femaleHair: "long" },
  러블리: { bg: "#FDE2EC", hair: "#8B5A3C", outfit: "#F48FB1", femaleHair: "long" },
  지적:   { bg: "#ECE6F7", hair: "#2A2420", outfit: "#8C7B6B", femaleHair: "bob" },
  세련:   { bg: "#F3EADF", hair: "#4A2F25", outfit: "#B0413E", femaleHair: "long" },
  듬직:   { bg: "#E2ECE9", hair: "#1C1C1C", outfit: "#4E6E5D", femaleHair: "bob" },
};

// 남자 헤어: 스타일마다 2가지, 같은 스타일끼리는 번갈아 가며 쓴다
const MALE_HAIR_BY_STYLE = {
  댄디:   ["sidepart", "pompadour"],
  스포티: ["buzz", "spiky"],
  캐주얼: ["curly", "twoblock"],
  지적:   ["twoblock", "short"],
  듬직:   ["short", "buzz"],
  귀여움: ["mushroom", "curly"],
  청순:   ["mushroom", "twoblock"],
  시크:   ["twoblock", "sidepart"],
  러블리: ["mushroom", "curly"],
  세련:   ["pompadour", "sidepart"],
};

const MALE_HAIR_PATHS = {
  short:     "M32 41 Q32 21 50 21 Q68 21 68 41 Q64 30 50 29 Q38 30 32 41 Z",
  mushroom:  "M32 44 Q31 21 50 21 Q69 21 68 44 Q63 33 50 34 Q38 33 32 44 Z",
  sidepart:  "M32 42 Q30 19 50 19 Q70 19 68 42 Q66 31 58 29 Q46 33 36 32 Q33 36 32 42 Z",
  pompadour: "M32 40 Q30 18 46 14 Q62 12 68 22 Q70 30 68 40 Q64 28 50 27 Q38 28 32 40 Z",
  buzz:      "M33 39 Q34 24 50 24 Q66 24 67 39 Q60 31 50 31 Q40 31 33 39 Z",
  spiky:     "M32 40 L33 26 L38 28 L41 19 L46 25 L51 17 L55 24 L61 19 L62 27 L67 26 L68 40 Q63 30 50 29 Q38 30 32 40 Z",
  twoblock:  "M32 43 Q31 21 50 20 Q69 21 68 38 Q60 33 52 38 Q44 35 32 43 Z",
};

function maleHair(p, color) {
  const options = MALE_HAIR_BY_STYLE[p.style] || ["short", "spiky"];
  const sameStyle = (typeof PROFILES !== "undefined" ? PROFILES : [])
    .filter(q => q.gender === "남" && q.style === p.style);
  const idx = sameStyle.findIndex(q => q.id === p.id);
  const type = options[(idx < 0 ? p.id : idx) % options.length];

  if (type === "curly") {
    const curls = [[34, 37], [36, 29], [42, 24], [50, 22], [58, 24], [64, 29], [66, 37]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${color}"/>`).join("");
    return `<path d="${MALE_HAIR_PATHS.short}" fill="${color}"/>${curls}`;
  }
  if (type === "sidepart") {
    return `<path d="${MALE_HAIR_PATHS.sidepart}" fill="${color}"/>` +
      `<path d="M40 21 Q38 26 37 31" stroke="#FFFFFF" stroke-width="0.8" opacity="0.35" fill="none"/>`;
  }
  if (type === "buzz") {
    return `<path d="${MALE_HAIR_PATHS.buzz}" fill="${color}" opacity="0.85"/>`;
  }
  return `<path d="${MALE_HAIR_PATHS[type]}" fill="${color}"/>`;
}

const SKIN_TONES =["#F9DCC4", "#F3CFAF", "#EEC39E", "#F6D5BA"];

function makeAvatar(p) {
  const look = STYLE_LOOK[p.style] || STYLE_LOOK["캐주얼"];
  const skin = SKIN_TONES[p.id % SKIN_TONES.length];
  const female = p.gender === "여";
  const s = p.style;
  const parts = [];

  // 배경
  parts.push(`<rect width="100" height="100" fill="${look.bg}"/>`);

  // 뒷머리 (여자)
  if (female) {
    const bottom = look.femaleHair === "long" ? 84 : 62;
    parts.push(`<path d="M30 46 Q28 19 50 19 Q72 19 70 46 L72 ${bottom} Q50 ${bottom + 5} 28 ${bottom} Z" fill="${look.hair}"/>`);
  }

  // 몸 (듬직은 어깨가 넓다)
  const body = s === "듬직"
    ? "M10 100 Q12 71 50 69 Q88 71 90 100 Z"
    : "M20 100 Q21 74 50 72 Q79 74 80 100 Z";
  parts.push(`<path d="${body}" fill="${look.outfit}"/>`);

  // 옷 디테일
  if (s === "댄디") {
    parts.push(`<path d="M42 72 L50 82 L58 72 Z" fill="#FFFFFF"/>`);
    parts.push(`<path d="M48.5 76 L51.5 76 L53 92 L50 96 L47 92 Z" fill="#B23A48"/>`);
  } else if (s === "캐주얼") {
    parts.push(`<path d="M36 74 Q50 84 64 74" stroke="#5E86B8" stroke-width="3" fill="none"/>`);
    parts.push(`<line x1="45" y1="78" x2="45" y2="90" stroke="#FFFFFF" stroke-width="1.2"/>`);
    parts.push(`<line x1="55" y1="78" x2="55" y2="90" stroke="#FFFFFF" stroke-width="1.2"/>`);
  } else if (s === "청순" || s === "지적") {
    parts.push(`<path d="M43 72 L50 78 L57 72" stroke="#D9D2C5" stroke-width="2" fill="none"/>`);
  }

  // 목, 귀, 얼굴
  parts.push(`<rect x="44" y="58" width="12" height="16" rx="4" fill="${skin}"/>`);
  parts.push(`<circle cx="33" cy="47" r="4" fill="${skin}"/>`);
  parts.push(`<circle cx="67" cy="47" r="4" fill="${skin}"/>`);
  parts.push(`<ellipse cx="50" cy="45" rx="17" ry="20" fill="${skin}"/>`);

  // 귀걸이 (세련)
  if (s === "세련") {
    parts.push(`<circle cx="33" cy="53" r="1.8" fill="#E6B84C"/><circle cx="67" cy="53" r="1.8" fill="#E6B84C"/>`);
  }

  // 앞머리
  if (female) {
    parts.push(`<path d="M32 46 Q29 21 50 21 Q71 21 68 46 Q64 33 54 31 Q50 37 40 35 Q35 38 32 46 Z" fill="${look.hair}"/>`);
  } else {
    parts.push(maleHair(p, look.hair));
  }

  // 헤어밴드 (스포티)
  if (s === "스포티") {
    parts.push(`<path d="M32.5 37 Q50 29 67.5 37 L67 41 Q50 33 33 41 Z" fill="#FFFFFF"/>`);
  }

  // 눈썹
  const browY = s === "시크" ? 40 : 41;
  parts.push(`<path d="M39 ${browY} Q43 ${browY - 2} 46 ${browY}" stroke="${look.hair}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`);
  parts.push(`<path d="M54 ${browY} Q57 ${browY - 2} 61 ${browY}" stroke="${look.hair}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`);

  // 눈
  if (s === "시크") {
    parts.push(`<path d="M40 47 Q43 45.5 46 47" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
    parts.push(`<path d="M54 47 Q57 45.5 60 47" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
  } else {
    const r = s === "귀여움" || s === "러블리" ? 2.6 : 2;
    parts.push(`<circle cx="43" cy="47" r="${r}" fill="#222"/><circle cx="57" cy="47" r="${r}" fill="#222"/>`);
    parts.push(`<circle cx="43.8" cy="46.2" r="0.7" fill="#FFF"/><circle cx="57.8" cy="46.2" r="0.7" fill="#FFF"/>`);
  }

  // 안경 (지적)
  if (s === "지적") {
    parts.push(`<g stroke="#333" stroke-width="1.2" fill="none"><circle cx="43" cy="47" r="5"/><circle cx="57" cy="47" r="5"/><line x1="48" y1="47" x2="52" y2="47"/></g>`);
  }

  // 볼터치
  if (s === "귀여움" || s === "러블리" || s === "청순") {
    parts.push(`<ellipse cx="39" cy="53" rx="3" ry="1.8" fill="#F4A3A8" opacity="0.6"/><ellipse cx="61" cy="53" rx="3" ry="1.8" fill="#F4A3A8" opacity="0.6"/>`);
  }

  // 입
  if (s === "시크") {
    parts.push(`<path d="M46 57 L54 57" stroke="${female ? "#A23B4A" : "#8A5A4A"}" stroke-width="1.6" stroke-linecap="round"/>`);
  } else {
    const lip = female ? "#D9576B" : "#A0614F";
    parts.push(`<path d="M45 56 Q50 60 55 56" stroke="${lip}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
  }

  // 수염자국 (듬직)
  if (s === "듬직") {
    parts.push(`<path d="M40 58 Q50 67 60 58" stroke="#8C8C8C" stroke-width="2.5" fill="none" opacity="0.25"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${p.name} 프로필 이미지">${parts.join("")}</svg>`;
}
