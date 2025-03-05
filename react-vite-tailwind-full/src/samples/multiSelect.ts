const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'France',
  'Germany',
  'Spain',
  'Italy',
  'Japan',
];

const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
];

const frameworks = [
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Next.js',
  'Express',
  'Django',
  'Spring',
];

const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Manager', 'Guest'];

const status = ['Active', 'Inactive', 'Pending', 'Suspended', 'Archived'];

const userTypes = [
  { id: '1', role: 'Admin', level: 'High', color: 'red' },
  { id: '2', role: 'User', level: 'Low', color: 'green' },
  { id: '3', role: 'Manager', level: 'Medium', color: 'blue' },
  { id: '4', role: 'Guest', level: 'Minimal', color: 'gray' },
];

const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];

export default {
  schema: {
    title: 'Multiple Select Examples',
    type: 'object',
    required: ['requiredSelect', 'multiSelectValidation'],
    properties: {
      basicSelect: {
        type: 'string',
        title: 'Basic Select',
        enum: countries,
        description: 'A simple single-select dropdown',
      },
      multiSelect: {
        type: 'array',
        title: 'Multi-Select',
        items: {
          type: 'string',
          enum: programmingLanguages,
        },
        uniqueItems: true,
        minItems: 1,
        maxItems: 4,
      },
      requiredSelect: {
        type: 'string',
        title: 'Required Select',
        enum: frameworks,
        description: 'This field is required',
      },
      selectWithDefault: {
        type: 'string',
        title: 'Select with Default',
        enum: countries,
        default: 'United States',
      },
      conditionalSelect: {
        type: 'string',
        title: 'Conditional Select',
        enum: ['Option A', 'Option B', 'Option C'],
        description: 'This will trigger a conditional field',
      },
      dependentField: {
        type: 'string',
        title: 'Dependent Field',
        enum: ['Dependent 1', 'Dependent 2'],
        description: 'This appears based on above selection',
      },
      multiSelectValidation: {
        type: 'array',
        title: 'Multi-Select with Validation',
        items: {
          type: 'string',
          enum: frameworks,
        },
        uniqueItems: true,
        minItems: 2,
        maxItems: 3,
      },
      enumWithTitles: {
        type: 'string',
        title: 'Enum with Custom Titles',
        enum: ['opt1', 'opt2', 'opt3'],
        enumNames: ['First Option', 'Second Option', 'Third Option'],
      },
      readOnlySelect: {
        type: 'string',
        title: 'Read-only Select',
        enum: roles,
        default: 'User',
        description: 'This field is read-only',
      },
      disabledMultiSelect: {
        type: 'array',
        title: 'Disabled Multi-Select',
        items: {
          type: 'string',
          enum: status,
        },
        uniqueItems: true,
        default: ['Active', 'Pending'],
      },
      customStyledSelect: {
        type: 'string',
        title: 'Custom Styled Select',
        enum: countries,
        description: 'This select has custom styling',
      },
      selectWithDisabledOptions: {
        type: 'string',
        title: 'Select with Disabled Options',
        enum: programmingLanguages,
        default: 'JavaScript',
      },
      hiddenSelect: {
        type: 'string',
        title: 'Hidden Select',
        enum: frameworks,
      },
      customClassSelect: {
        type: 'array',
        title: 'Select with Custom Classes',
        items: {
          type: 'string',
          enum: roles,
        },
        uniqueItems: true,
      },
      themeSelect: {
        type: 'string',
        title: 'Theme Selection',
        enum: ['light', 'dark', 'system'],
        default: 'system',
      },
      colorScheme: {
        type: 'string',
        title: 'Color Scheme',
        enum: ['blue', 'red', 'green', 'purple'],
      },
      userTypeSelect: {
        type: 'string',
        title: 'User Type',
        enum: userTypes.map((u) => u.id),
        enumNames: userTypes.map((u) => u.role),
      },
      departmentConditional: {
        type: 'string',
        title: 'Department',
        enum: departments,
      },
      accessLevel: {
        type: 'string',
        title: 'Access Level',
        enum: ['read', 'write', 'admin'],
      },
      notifications: {
        type: 'array',
        title: 'Notification Preferences',
        items: {
          type: 'string',
          enum: ['email', 'sms', 'push', 'in-app'],
        },
        uniqueItems: true,
      },
    },
    dependencies: {
      conditionalSelect: {
        oneOf: [
          {
            properties: {
              conditionalSelect: {
                enum: ['Option A'],
              },
              dependentField: {
                enum: ['Dependent 1', 'Dependent 2'],
              },
            },
          },
          {
            properties: {
              conditionalSelect: {
                enum: ['Option B', 'Option C'],
              },
              dependentField: {
                enum: ['Dependent 2'],
              },
            },
          },
        ],
      },
      departmentConditional: {
        oneOf: [
          {
            properties: {
              departmentConditional: { enum: ['IT'] },
              accessLevel: { enum: ['read', 'write', 'admin'] },
            },
          },
          {
            properties: {
              departmentConditional: { enum: ['HR', 'Finance'] },
              accessLevel: { enum: ['read', 'write'] },
            },
          },
          {
            properties: {
              departmentConditional: { enum: ['Marketing', 'Operations'] },
              accessLevel: { enum: ['read'] },
            },
          },
        ],
      },
      themeSelect: {
        oneOf: [
          {
            properties: {
              themeSelect: { enum: ['dark'] },
              colorScheme: { enum: ['blue', 'purple'] },
            },
          },
          {
            properties: {
              themeSelect: { enum: ['light'] },
              colorScheme: { enum: ['red', 'green'] },
            },
          },
          {
            properties: {
              themeSelect: { enum: ['system'] },
              colorScheme: { enum: ['blue', 'red', 'green', 'purple'] },
            },
          },
        ],
      },
    },
  },
  uiSchema: {
    basicSelect: {
      'ui:placeholder': 'Select a country',
      'ui:help': 'Click to select a single country',
    },
    multiSelect: {
      'ui:widget': 'select',
      'ui:options': {
        multiple: true,
        placeholder: 'Choose up to 4 programming languages',
      },
    },
    requiredSelect: {
      'ui:widget': 'select',
      'ui:placeholder': 'Select a framework (required)',
      'ui:required': true,
    },
    selectWithDefault: {
      'ui:widget': 'select',
      'ui:placeholder': 'Select a country (has default)',
      'ui:disabled': false,
    },
    conditionalSelect: {
      'ui:widget': 'select',
      'ui:placeholder': 'Select to show/hide dependent field',
      'ui:help': 'Option A shows all dependent options, B and C limit choices',
    },
    dependentField: {
      'ui:widget': 'select',
      'ui:placeholder': 'Dependent choices',
    },
    multiSelectValidation: {
      'ui:widget': 'select',
      'ui:options': {
        multiple: true,
      },
      'ui:help': 'Select 2-3 frameworks',
      'ui:placeholder': 'Select frameworks (required)',
    },
    enumWithTitles: {
      'ui:enumDisabled': ['opt2'],
      'ui:help': 'Second option is disabled',
    },
    readOnlySelect: {
      'ui:readonly': true,
      'ui:help': 'This field cannot be modified',
      'ui:widget': 'select',
    },
    disabledMultiSelect: {
      'ui:disabled': true,
      'ui:widget': 'select',
      'ui:options': {
        multiple: true,
      },
      'ui:help': 'This multi-select is disabled',
    },
    customStyledSelect: {
      'ui:widget': 'select',
      'ui:classNames': 'custom-select-container',
      'ui:options': {
        className: 'custom-select-input',
      },
      'ui:placeholder': 'Select with custom styling',
    },
    selectWithDisabledOptions: {
      'ui:enumDisabled': ['Python', 'Java', 'C++'],
      'ui:help': 'Some options are disabled',
      'ui:widget': 'select',
    },
    hiddenSelect: {
      'ui:widget': 'hidden',
    },
    customClassSelect: {
      'ui:widget': 'select',
      'ui:options': {
        multiple: true,
        className: 'multi-select-custom',
        menuClassName: 'select-menu-custom',
        optionClassName: 'select-option-custom',
      },
      'ui:fieldClass': 'field-custom-class',
      'ui:labelClass': 'label-custom-class',
    },
    themeSelect: {
      'ui:widget': 'select',
      'ui:options': {
        className:
          'w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      },
      'ui:classNames': 'space-y-2',
    },
    colorScheme: {
      'ui:widget': 'select',
      'ui:options': {
        className: 'w-full rounded-lg border-gray-300',
      },
    },
    userTypeSelect: {
      'ui:widget': 'select',
      'ui:options': {
        className: 'w-full rounded-lg',
        optionClassName: (option: any) => {
          const userType = userTypes.find((u) => u.id === option.value);
          return `flex items-center p-2 ${
            userType?.color === 'red'
              ? 'text-red-600'
              : userType?.color === 'green'
              ? 'text-green-600'
              : userType?.color === 'blue'
              ? 'text-blue-600'
              : 'text-gray-600'
          }`;
        },
      },
    },
    departmentConditional: {
      'ui:widget': 'select',
      'ui:options': {
        className: 'w-full rounded-lg border-gray-300 shadow-sm',
      },
      'ui:help': 'Department selection affects available access levels',
    },
    accessLevel: {
      'ui:widget': 'select',
      'ui:options': {
        className: 'w-full rounded-lg border-gray-300',
        optionClassName: (option: any) => {
          return `${
            option.value === 'admin'
              ? 'bg-red-50 text-red-700'
              : option.value === 'write'
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-green-50 text-green-700'
          } p-2`;
        },
      },
    },
    notifications: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: true,
        className: 'space-x-4',
        optionClassName: 'inline-flex items-center space-x-2',
      },
      'ui:classNames': 'p-4 bg-gray-50 rounded-lg',
    },
  },
  formData: {
    selectWithDefault: 'United States',
    multiSelect: ['JavaScript'],
    enumWithTitles: 'opt1',
    readOnlySelect: 'User',
    disabledMultiSelect: ['Active', 'Pending'],
    selectWithDisabledOptions: 'JavaScript',
    customClassSelect: ['Admin'],
    themeSelect: 'system',
    userTypeSelect: '2',
    departmentConditional: 'IT',
    accessLevel: 'read',
    notifications: ['email'],
  },
};
