import { RJSFSchema, UiSchema } from '@rjsf/utils';

export interface LiveSettings {
  showErrorList: false | 'top' | 'bottom';
  [key: string]: any;
}

export const liveSettingsBooleanSchema: RJSFSchema = {
  type: 'object',
  properties: {
    liveValidate: { type: 'boolean', title: 'Live validation' },
    disabled: { type: 'boolean', title: 'Disable whole form' },
    readonly: { type: 'boolean', title: 'Readonly whole form' },
    omitExtraData: { type: 'boolean', title: 'Omit extra data' },
    liveOmit: { type: 'boolean', title: 'Live omit' },
    noValidate: { type: 'boolean', title: 'Disable validation' },
    noHtml5Validate: { type: 'boolean', title: 'Disable HTML 5 validation' },
    focusOnFirstError: { type: 'boolean', title: 'Focus on 1st Error' },
    showErrorList: {
      type: 'string',
      default: 'top',
      title: 'Show Error List',
      enum: [false, 'top', 'bottom'],
    },
  },
};

export const liveSettingsSelectSchema: RJSFSchema = {
  type: 'object',
  properties: {
    experimental_defaultFormStateBehavior: {
      title: 'Default Form State Behavior (Experimental)',
      type: 'object',
      properties: {
        arrayMinItems: {
          type: 'object',
          properties: {
            populate: {
              type: 'string',
              default: 'all',
              title: 'Populate minItems in arrays',
              oneOf: [
                {
                  type: 'string',
                  title:
                    'Populate remaining minItems with default values (legacy behavior)',
                  enum: ['all'],
                },
                {
                  type: 'string',
                  title:
                    'Only populate minItems with default values when field is required',
                  enum: ['requiredOnly'],
                },
                {
                  type: 'string',
                  title: 'Never populate minItems with default values',
                  enum: ['never'],
                },
              ],
            },
            mergeExtraDefaults: {
              title: 'Merge array defaults with formData',
              type: 'boolean',
              default: false,
            },
          },
        },
        allOf: {
          type: 'string',
          title: 'allOf defaults behaviour',
          default: 'skipDefaults',
          oneOf: [
            {
              type: 'string',
              title: 'Populate defaults with allOf',
              enum: ['populateDefaults'],
            },
            {
              type: 'string',
              title: 'Skip populating defaults with allOf',
              enum: ['skipDefaults'],
            },
          ],
        },
        constAsDefaults: {
          type: 'string',
          title: 'const as default behavior',
          default: 'always',
          oneOf: [
            {
              type: 'string',
              title:
                'A const value will always be merged into the form as a default',
              enum: ['always'],
            },
            {
              type: 'string',
              title:
                'If const is in a `oneOf` it will NOT pick the first value as a default',
              enum: ['skipOneOf'],
            },
            {
              type: 'string',
              title: 'A const value will never be used as a default',
              enum: ['never'],
            },
          ],
        },
        emptyObjectFields: {
          type: 'string',
          title: 'Object fields default behavior',
          default: 'populateAllDefaults',
          oneOf: [
            {
              type: 'string',
              title:
                'Assign value to formData when default is primitive, non-empty object field, or is required (legacy behavior)',
              enum: ['populateAllDefaults'],
            },
            {
              type: 'string',
              title:
                'Assign value to formData when default is an object and parent is required, or default is primitive and is required',
              enum: ['populateRequiredDefaults'],
            },
            {
              type: 'string',
              title: 'Assign value to formData when only default is set',
              enum: ['skipEmptyDefaults'],
            },
            {
              type: 'string',
              title: 'Does not set defaults',
              enum: ['skipDefaults'],
            },
          ],
        },
        mergeDefaultsIntoFormData: {
          type: 'string',
          title: 'Merge defaults into formData',
          default: 'useFormDataIfPresent',
          oneOf: [
            {
              type: 'string',
              title: 'Use undefined field value if present',
              enum: ['useFormDataIfPresent'],
            },
            {
              type: 'string',
              title: 'Use default for undefined field value',
              enum: ['useDefaultIfFormDataUndefined'],
            },
          ],
        },
      },
    },
  },
};

export const liveSettingsBooleanUiSchema: UiSchema = {
  showErrorList: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true,
    },
  },
};

export const liveSettingsSelectUiSchema: UiSchema = {
  experimental_defaultFormStateBehavior: {
    'ui:options': {
      label: false,
    },
    arrayMinItems: {
      'ui:options': {
        label: true,
      },
    },
  },
};
