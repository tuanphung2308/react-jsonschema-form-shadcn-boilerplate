export default {
  schema: {
    type: 'object',
    required: ['eventName', 'eventDate', 'description'],
    properties: {
      eventName: {
        type: 'string',
        title: 'Event Name',
        minLength: 3,
      },
      eventDate: {
        type: 'string',
        format: 'date',
        title: 'Event Date',
      },
      bodyParts: {
        type: 'array',
        title: 'Body Parts',
        items: {
          type: 'string',
          enum: ['arms', 'legs', 'core', 'chest', 'back', 'shoulders'],
        },
        uniqueItems: true,
      },
      description: {
        type: 'string',
        title: 'Description',
        minLength: 10,
      },
      priority: {
        type: 'string',
        title: 'Priority',
        enum: ['low', 'medium', 'high'],
      },
      calendarUpdate: {
        type: 'string',
        title: 'Calendar Update Trigger',
      },
    },
    dependencies: {
      bodyParts: {
        properties: {
          calendarUpdate: {
            type: 'string',
            default: new Date().toISOString(),
          },
          eventDate: {
            type: 'string',
            format: 'date',
            title: 'Event Date',
          },
        },
      },
    },
  },
  uiSchema: {
    eventName: {
      'ui:className': 'mb-4',
      'ui:placeholder': 'Enter event name',
    },
    eventDate: {
      'ui:widget': 'CustomCalendarWidget',
      'ui:className': 'mb-4',
      'ui:options': {
        updateOnBodyPartsChange: true,
      },
    },
    description: {
      'ui:widget': 'textarea',
      'ui:className': 'mb-4',
      'ui:placeholder': 'Enter event description',
    },
    priority: {
      'ui:widget': 'select',
      'ui:className': 'mb-4',
    },
    bodyParts: {
      'ui:widget': 'checkboxes',
      'ui:className': 'mb-4',
      'ui:options': {
        inline: true,
      },
    },
    calendarUpdate: {
      'ui:widget': 'hidden',
    },
  },
};
