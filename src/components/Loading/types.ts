export interface LoadingSlice {
  src: string;
  alt?: string;
}

export interface LoadingProps {
  slices?: LoadingSlice[];
  className?: string;
  duration?: number;
  onFinish?: () => void;
}

export type LoadingHandle = {
  finish: (onComplete?: () => void) => void;
};
