// 가상 프로필 24명의 이상형 (양방향 매칭용)
// "상대도 나를 좋아할까?"를 계산할 때, 이 이상형을 기준으로 나를 점수표로 채점한다
// 항목: 나이 범위, 이상형 키, 좋아하는 스타일, 같은 지역 선호, 비흡연 선호, 종교, MBTI
const IDEALS = {
  1:  { ageMin: 27, ageMax: 33, idealHeight: 178, likeStyles: ["댄디", "캐주얼"], wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  2:  { ageMin: 25, ageMax: 30, idealHeight: 163, likeStyles: ["청순", "세련"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  3:  { ageMin: 25, ageMax: 31, idealHeight: 175, likeStyles: ["지적", "댄디"],   wantSameRegion: false, wantNoSmoke: true,  wantReligion: "기독교",   wantMbti: [] },
  4:  { ageMin: 26, ageMax: 33, idealHeight: 163, likeStyles: ["스포티", "캐주얼"], wantSameRegion: true, wantNoSmoke: false, wantReligion: "상관없음", wantMbti: [] },
  5:  { ageMin: 30, ageMax: 36, idealHeight: 180, likeStyles: ["지적", "댄디"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: ["INTP", "ENTJ"] },
  6:  { ageMin: 22, ageMax: 27, idealHeight: 160, likeStyles: ["귀여움", "러블리"], wantSameRegion: false, wantNoSmoke: true, wantReligion: "상관없음", wantMbti: [] },
  7:  { ageMin: 28, ageMax: 34, idealHeight: 176, likeStyles: ["듬직", "댄디"],   wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  8:  { ageMin: 26, ageMax: 32, idealHeight: 165, likeStyles: ["시크", "청순"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "기독교",   wantMbti: ["INTJ", "ENFP"] },
  9:  { ageMin: 24, ageMax: 30, idealHeight: 180, likeStyles: ["댄디", "스포티"], wantSameRegion: false, wantNoSmoke: false, wantReligion: "상관없음", wantMbti: [] },
  10: { ageMin: 24, ageMax: 30, idealHeight: 166, likeStyles: ["세련", "시크"],   wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  11: { ageMin: 26, ageMax: 31, idealHeight: 175, likeStyles: ["캐주얼", "귀여움"], wantSameRegion: true, wantNoSmoke: true, wantReligion: "상관없음", wantMbti: [] },
  12: { ageMin: 28, ageMax: 35, idealHeight: 165, likeStyles: ["세련", "청순"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  13: { ageMin: 29, ageMax: 35, idealHeight: 182, likeStyles: ["댄디", "지적"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "기독교",   wantMbti: [] },
  14: { ageMin: 24, ageMax: 30, idealHeight: 160, likeStyles: ["청순", "러블리"], wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: ["ENFJ", "ENFP"] },
  15: { ageMin: 30, ageMax: 36, idealHeight: 177, likeStyles: ["지적", "듬직"],   wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  16: { ageMin: 24, ageMax: 31, idealHeight: 167, likeStyles: ["스포티", "세련"], wantSameRegion: false, wantNoSmoke: false, wantReligion: "상관없음", wantMbti: [] },
  17: { ageMin: 23, ageMax: 28, idealHeight: 175, likeStyles: ["귀여움", "캐주얼"], wantSameRegion: false, wantNoSmoke: true, wantReligion: "상관없음", wantMbti: [] },
  18: { ageMin: 27, ageMax: 34, idealHeight: 162, likeStyles: ["청순", "세련"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "불교",     wantMbti: [] },
  19: { ageMin: 26, ageMax: 32, idealHeight: 178, likeStyles: ["캐주얼", "듬직"], wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  20: { ageMin: 22, ageMax: 27, idealHeight: 162, likeStyles: ["귀여움", "캐주얼"], wantSameRegion: false, wantNoSmoke: true, wantReligion: "상관없음", wantMbti: ["INTJ", "INFJ"] },
  21: { ageMin: 31, ageMax: 38, idealHeight: 178, likeStyles: ["댄디", "듬직"],   wantSameRegion: true,  wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  22: { ageMin: 25, ageMax: 31, idealHeight: 160, likeStyles: ["러블리", "청순"], wantSameRegion: false, wantNoSmoke: true,  wantReligion: "기독교",   wantMbti: [] },
  23: { ageMin: 25, ageMax: 31, idealHeight: 180, likeStyles: ["스포티", "듬직"], wantSameRegion: false, wantNoSmoke: true,  wantReligion: "상관없음", wantMbti: [] },
  24: { ageMin: 24, ageMax: 30, idealHeight: 163, likeStyles: ["캐주얼", "스포티"], wantSameRegion: false, wantNoSmoke: true, wantReligion: "상관없음", wantMbti: [] },
};
