import { create } from 'zustand';
import { Sample } from '@/samples';

export interface AppState {
  currentSample: Sample;
  setCurrentSample: (sample: Sample) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSample: 'Simple',
  setCurrentSample: (sample: Sample) => set({ currentSample: sample }),
}));
