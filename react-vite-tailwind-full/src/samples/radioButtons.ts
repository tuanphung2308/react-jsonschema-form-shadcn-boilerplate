const themes = ['light', 'dark', 'system'];
const sizes = ['small', 'medium', 'large', 'extra large'];
const priorities = ['low', 'medium', 'high', 'critical'];
const layouts = ['horizontal', 'vertical', 'grid'];
const statusOptions = ['active', 'pending', 'suspended', 'archived'];

const subscriptionPlans = [
  { id: 'free', name: 'Free', price: '$0/month' },
  { id: 'pro', name: 'Pro', price: '$9.99/month' },
  { id: 'enterprise', name: 'Enterprise', price: '$49.99/month' },
];

export default {
  schema: {
    title: 'Radio Button Examples',
    type: 'object',
    required: ['requiredRadio'],
    properties: {
      basicRadio: {
        type: 'string',
        title: 'Basic Radio',
        enum: themes,
        description: 'A simple radio button group',
      },
      requiredRadio: {
        type: 'string',
        title: 'Required Radio',
        enum: sizes,
        description: 'This field is required',
      },
      radioWithDefault: {
        type: 'string',
        title: 'Radio with Default',
        enum: priorities,
        default: 'medium',
      },
      disabledRadio: {
        type: 'string',
        title: 'Disabled Radio',
        enum: layouts,
        default: 'horizontal',
      },
      conditionalRadio: {
        type: 'string',
        title: 'Conditional Radio',
        enum: ['yes', 'no', 'maybe'],
        description: 'This will trigger a conditional field',
      },
      dependentField: {
        type: 'string',
        title: 'Dependent Field',
        enum: ['option1', 'option2'],
      },
      styledRadio: {
        type: 'string',
        title: 'Styled Radio Buttons',
        enum: ['red', 'green', 'blue'],
        description: 'Custom styled radio buttons',
      },
      subscriptionPlan: {
        type: 'string',
        title: 'Subscription Plan',
        enum: subscriptionPlans.map((plan) => plan.id),
        enumNames: subscriptionPlans.map(
          (plan) => `${plan.name} (${plan.price})`
        ),
      },
      alignment: {
        type: 'string',
        title: 'Content Alignment',
        enum: ['left', 'center', 'right', 'justify'],
      },
      statusWithDisabled: {
        type: 'string',
        title: 'Status Selection',
        enum: statusOptions,
        description: 'Some options are disabled',
      },
    },
    dependencies: {
      conditionalRadio: {
        oneOf: [
          {
            properties: {
              conditionalRadio: {
                enum: ['yes'],
              },
              dependentField: {
                enum: ['option1', 'option2'],
              },
            },
          },
          {
            properties: {
              conditionalRadio: {
                enum: ['no', 'maybe'],
              },
              dependentField: {
                enum: ['option2'],
              },
            },
          },
        ],
      },
    },
  },
  uiSchema: {
    basicRadio: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
      },
    },
    requiredRadio: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: false,
      },
      'ui:required': true,
    },
    radioWithDefault: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
      },
    },
    disabledRadio: {
      'ui:widget': 'radio',
      'ui:disabled': true,
      'ui:options': {
        inline: true,
      },
    },
    conditionalRadio: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
      },
    },
    dependentField: {
      'ui:widget': 'radio',
    },
    styledRadio: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
        className: 'custom-radio-group',
        optionClassName: (option: any) => {
          return `radio-${option.value}`;
        },
      },
    },
    subscriptionPlan: {
      'ui:widget': 'radio',
      'ui:options': {
        className: 'subscription-radio-group',
        optionClassName: 'p-4 border rounded-lg hover:bg-gray-50',
      },
    },
    alignment: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
        className: 'flex gap-4',
      },
    },
    statusWithDisabled: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
        enumDisabled: ['suspended', 'archived'],
      },
    },
  },
  formData: {
    radioWithDefault: 'medium',
    disabledRadio: 'horizontal',
    styledRadio: 'blue',
    subscriptionPlan: 'free',
    alignment: 'left',
    statusWithDisabled: 'active',
  },
};
