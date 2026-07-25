import type { LoadingSlice } from "./types";

const BASE = "https://assets.loscolmebrothers.com/logo/slices/vector";

export const DEFAULT_SLICES: LoadingSlice[] = [
  { src: `${BASE}/LOS.svg`, alt: "LOS" },
  { src: `${BASE}/COLME.svg`, alt: "COLME" },
  { src: `${BASE}/BROTHERS.svg`, alt: "BROTHERS" },
];
