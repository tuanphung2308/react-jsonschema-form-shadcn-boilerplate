const hobbies = [
  'Reading',
  'Gaming',
  'Cooking',
  'Traveling',
  'Photography',
  'Music',
  'Sports',
  'Art',
];

const permissions = [
  'view_dashboard',
  'edit_profile',
  'manage_users',
  'delete_records',
  'export_data',
  'import_data',
];

const settings = [
  'email_notifications',
  'sms_alerts',
  'two_factor_auth',
  'dark_mode',
  'auto_save',
];

const subscriptionFeatures = [
  'Basic Access',
  'Premium Content',
  'Cloud Storage',
  'Priority Support',
  'Offline Mode',
];

const privacyOptions = [
  'Share Profile',
  'Show Online Status',
  'Allow Messages',
  'Public Email',
];

export default {
  schema: {
    title: 'Checkbox Examples',
    type: 'object',
    required: ['termsAccepted', 'requiredOptions'],
    properties: {
      singleCheckbox: {
        type: 'boolean',
        title: 'Single Checkbox',
        description: 'A simple true/false checkbox',
      },
      termsAccepted: {
        type: 'boolean',
        title: 'Terms and Conditions',
        description: 'You must accept the terms to proceed',
      },
      hobbies: {
        type: 'array',
        title: 'Select Your Hobbies',
        items: {
          type: 'string',
          enum: hobbies,
        },
        uniqueItems: true,
      },
      permissions: {
        type: 'array',
        title: 'User Permissions',
        items: {
          type: 'string',
          enum: permissions,
        },
        uniqueItems: true,
        minItems: 1,
      },
      notificationPreferences: {
        type: 'object',
        title: 'Notification Settings',
        properties: {
          email: { type: 'boolean', title: 'Email Notifications' },
          push: { type: 'boolean', title: 'Push Notifications' },
          sms: { type: 'boolean', title: 'SMS Notifications' },
        },
      },
      requiredOptions: {
        type: 'array',
        title: 'Required Selections',
        items: {
          type: 'string',
          enum: settings,
        },
        minItems: 2,
        maxItems: 4,
        uniqueItems: true,
      },
      subscriptionTier: {
        type: 'array',
        title: 'Subscription Features',
        items: {
          type: 'string',
          enum: subscriptionFeatures,
        },
        uniqueItems: true,
      },
      privacySettings: {
        type: 'array',
        title: 'Privacy Settings',
        items: {
          type: 'string',
          enum: privacyOptions,
        },
        uniqueItems: true,
      },
      conditionalSection: {
        type: 'boolean',
        title: 'Enable Advanced Settings',
      },
      disabledOptions: {
        type: 'array',
        title: 'Disabled Options Example',
        items: {
          type: 'string',
          enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        uniqueItems: true,
      },
    },
    dependencies: {
      conditionalSection: {
        oneOf: [
          {
            properties: {
              conditionalSection: { enum: [true] },
              advancedSettings: {
                type: 'object',
                title: 'Advanced Settings',
                properties: {
                  logging: {
                    type: 'boolean',
                    title: 'Enable Logging',
                  },
                  backups: {
                    type: 'boolean',
                    title: 'Automatic Backups',
                  },
                  analytics: {
                    type: 'boolean',
                    title: 'Usage Analytics',
                  },
                  logLevel: {
                    type: 'string',
                    title: 'Log Level',
                    enum: ['debug', 'info', 'warn', 'error'],
                  },
                },
                dependencies: {
                  logging: {
                    oneOf: [
                      {
                        properties: {
                          logging: { enum: [true] },
                          logLevel: {
                            type: 'string',
                          },
                        },
                        required: ['logLevel'],
                      },
                      {
                        properties: {
                          logging: { enum: [false] },
                        },
                      },
                    ],
                  },
                },
              },
            },
            required: ['advancedSettings'],
          },
          {
            properties: {
              conditionalSection: { enum: [false] },
            },
          },
        ],
      },
    },
  },
  uiSchema: {
    singleCheckbox: {
      'ui:widget': 'checkbox',
      'ui:options': {
        label: false,
      },
    },
    termsAccepted: {
      'ui:widget': 'checkbox',
      'ui:options': {
        inline: true,
      },
      'ui:help': 'You must accept the terms to continue',
    },
    hobbies: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: true,
      },
      'ui:classNames': 'checkbox-grid',
    },
    permissions: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: false,
      },
      'ui:classNames': 'permission-checkboxes',
    },
    notificationPreferences: {
      'ui:classNames': 'notification-group',
    },
    requiredOptions: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: true,
      },
      'ui:help': 'Select between 2 and 4 options',
    },
    subscriptionTier: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: false,
      },
      'ui:classNames': 'subscription-features',
    },
    privacySettings: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: true,
      },
    },
    conditionalSection: {
      'ui:widget': 'checkbox',
      'ui:help': 'Enable to show advanced settings',
    },
    advancedSettings: {
      'ui:classNames': 'advanced-settings-group',
      logging: {
        'ui:help': 'Enable detailed logging',
      },
    },
    disabledOptions: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: true,
      },
      'ui:enumDisabled': ['Option 2', 'Option 4'],
    },
  },
  formData: {
    singleCheckbox: false,
    termsAccepted: false,
    hobbies: ['Reading', 'Gaming'],
    permissions: ['view_dashboard'],
    notificationPreferences: {
      email: true,
      push: false,
      sms: false,
    },
    requiredOptions: ['email_notifications', 'auto_save'],
    subscriptionTier: ['Basic Access'],
    privacySettings: ['Show Online Status'],
    conditionalSection: false,
    disabledOptions: ['Option 1'],
  },
};
