//@ts-nocheck
import { create } from 'zustand';
import { Sample, samples } from '@/samples';
import { ErrorSchema, RJSFSchema, UiSchema } from '@rjsf/utils';
import { LiveSettings } from '@/constants';

interface SampleData {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  extraErrors?: ErrorSchema;
  formData: any;
  validate?: (params: any) => any;
  transformErrors?: ErrorTransformer<any, RJSFSchema, any> | undefined;
}

const defaultLiveSettings: LiveSettings = {
  showErrorList: 'top',
  liveValidate: false,
  noValidate: false,
  disabled: false,
  noHtml5Validate: false,
  readonly: false,
  omitExtraData: false,
  liveOmit: false,
  experimental_defaultFormStateBehavior: {
    arrayMinItems: {
      populate: 'all',
      mergeExtraDefaults: false,
    },
    emptyObjectFields: 'populateAllDefaults',
  },
};

export interface AppState {
  currentSample: Sample;
  currentSampleData: SampleData;
  currentFormData: any;
  liveSettings: LiveSettings;
  setCurrentSample: (sample: Sample) => void;
  setCurrentSampleSchema: (schema: RJSFSchema) => void;
  setCurrentSampleUiSchema: (uiSchema: UiSchema) => void;
  setCurrentSampleExtraErrorSchema: (
    extraErrors: ErrorSchema | undefined
  ) => void;
  setCurrentFormData: (formData: any) => void;
  setLiveSettings: (settings: Partial<LiveSettings>) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSample: 'Simple',
  currentSampleData: samples['Simple'],
  currentFormData: samples['Simple'].formData ?? {},
  liveSettings: defaultLiveSettings,
  setCurrentSample: (sample: Sample) => {
    set({
      currentSample: sample,
      currentSampleData: {
        ...samples[sample],
      },
      currentFormData: samples[sample].formData ?? {},
    });
  },
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
        extraErrors: extraErrors,
      },
    })),
  setCurrentFormData: (formData: any) =>
    set({
      currentFormData: formData,
    }),
  setLiveSettings: (settings: Partial<LiveSettings>) =>
    set((state) => ({
      liveSettings: {
        ...state.liveSettings,
        ...settings,
      },
    })),
}));
