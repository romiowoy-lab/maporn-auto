// Real transparent product cutouts exist for exactly these flagship models — used here
// for the "floating car" treatment. Every other model only has a regular bounded photo
// (still real, just not a cutout), so the carousel falls back to mix-blend-mode: multiply
// to lift the white studio background off instead of showing a white box.
export const CUTOUTS: Record<string, string> = {
  "suzuki-fronx": "/brand/studio2/suzuki-fronx-cutout.png",
  "suzuki-xl7": "/brand/studio2/suzuki-xl7-cutout.png",
  "farizon-e5": "/brand/studio/farizon-transparent.png",
  "wuling-air-ev": "/brand/studio/wuling-transparent.png",
  "wuling-xingguang-s60": "/brand/studio2/wuling-xingguang-s-cutout.png",
  "nex-bev-pickup": "/brand/studio/nex-transparent.png",
  "gwm-tank-300": "/brand/studio2/gwm-tank300-cutout.png",
  "omoda-c5-ev": "/brand/studio2/omoda-c5-ev-cutout.png",
  "omoda-5": "/brand/studio/omoda-transparent.png",
  "jaecoo-j7": "/brand/studio2/jaecoo-j7-shadow.png",
  "lepas-l6": "/brand/studio2/lepas-l6-cutout.png",
};
