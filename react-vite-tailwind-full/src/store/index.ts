import { create } from 'zustand';
import { Sample, samples } from '@/samples';
import {ErrorSchema, RJSFSchema, UiSchema} from '@rjsf/utils';

interface SampleData {
  schema: RJSFSchema;
  uiSchema: UiSchema;
    extraErrors: ErrorSchema;
  formData: any;
}

export interface AppState {
  currentSample: Sample;
  currentSampleData: SampleData;
  setCurrentSample: (sample: Sample) => void;
  setCurrentSampleSchema: (schema: RJSFSchema) => void;
  setCurrentSampleUiSchema: (uiSchema: UiSchema) => void;
    setCurrentSampleExtraErrorSchema: (extraErrors: ErrorSchema | undefined) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSample: 'Simple',
  currentSampleData: samples['Simple'],
  setCurrentSample: (sample: Sample) =>
    set({
      currentSample: sample,
      currentSampleData: samples[sample],
    }),
  setCurrentSampleSchema: (schema: RJSFSchema) =>
    set((state) => ({
      currentSampleData: {
        ...state.currentSampleData,
        schema,
      },
    })),
  setCurrentSampleUiSchema: (uiSchema: UiSchema) =>
    set((state) => ({
      currentSampleData: {
        ...state.currentSampleData,
        uiSchema,
      },
    })),
    setCurrentSampleExtraErrorSchema: (extraErrors: ErrorSchema | undefined) =>
        set((state) => ({
            currentSampleData: {
                ...state.currentSampleData,
                extraErrors: extraErrors ?? {},
            },
        })),
}));
