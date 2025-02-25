import { JSONSchema7 } from 'json-schema';

// Custom widget interfaces
interface CustomWidgetProps {
    id: string;
    value: any;
    onChange: (value: any) => void;
    options?: any;
}

// Type definitions
interface FormData {
    projectName?: string;
    themeColors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
    };
    deploymentDate?: {
        start?: string;
        end?: string;
    };
    contractDetails?: {
        address?: string;
        network?: string;
        chainId?: number;
    };
    features?: string[];
    accessControl?: {
        roles?: string[];
        permissions?: string[];
    };
}

interface UISchema {
    [key: string]: {
        'ui:widget'?: string;
        'ui:options'?: any;
        'ui:order'?: string[];
        'ui:field'?: string;
        'ui:help'?: string;
        'ui:description'?: string;
        'ui:disabled'?: boolean;
        'ui:readonly'?: boolean;
        classNames?: string;
    };
}

const formConfig: {
    schema: JSONSchema7;
    uiSchema: UISchema;
    formData: FormData;
    widgets: Record<string, React.FC<CustomWidgetProps>>;
} = {
    schema: {
        title: 'Advanced Smart Contract Configuration',
        type: 'object',
        required: ['projectName', 'themeColors', 'contractDetails'],
        properties: {
            projectName: {
                type: 'string',
                title: 'Project Name',
                minLength: 3,
                maxLength: 50
            },
            themeColors: {
                type: 'object',
                title: 'Theme Colors',
                properties: {
                    primary: {
                        type: 'string',
                        title: 'Primary Color',
                        pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
                    },
                    secondary: {
                        type: 'string',
                        title: 'Secondary Color',
                        pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
                    },
                    accent: {
                        type: 'string',
                        title: 'Accent Color',
                        pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
                    }
                }
            },
            deploymentDate: {
                type: 'object',
                title: 'Deployment Schedule',
                properties: {
                    start: {
                        type: 'string',
                        format: 'date-time'
                    },
                    end: {
                        type: 'string',
                        format: 'date-time'
                    }
                }
            },
            contractDetails: {
                type: 'object',
                title: 'Contract Details',
                properties: {
                    address: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$'
                    },
                    network: {
                        type: 'string',
                        enum: ['mainnet', 'testnet', 'local']
                    },
                    chainId: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            },
            features: {
                type: 'array',
                title: 'Features',
                items: {
                    type: 'string',
                    enum: ['Pausable', 'Upgradeable', 'AccessControl', 'Multicall']
                },
                uniqueItems: true
            }
        }
    },
    uiSchema: {
        projectName: {
            'ui:help': 'Enter a unique project identifier',
            classNames: 'project-name-field'
        },
        themeColors: {
            'ui:field': 'collapsible',
            'ui:order': ['primary', 'secondary', 'accent'],
            // @ts-ignore
            primary: {
                'ui:widget': 'ColorPicker',
                'ui:options': {
                    showPalette: true,
                    presetColors: ['#1976d2', '#388e3c', '#d32f2f']
                }
            },
            secondary: {
                'ui:widget': 'ColorPicker',
                'ui:options': {
                    showPalette: true
                }
            },
            accent: {
                'ui:widget': 'ColorPicker',
                'ui:options': {
                    showPalette: true
                }
            }
        },
        deploymentDate: {
            'ui:widget': 'DateRangeWidget',
            'ui:options': {
                showTime: true,
                format: 'YYYY-MM-DD HH:mm'
            }
        },
        contractDetails: {
            // @ts-ignore
            address: {
                'ui:widget': 'AddressWidget',
                'ui:help': 'Enter a valid Ethereum address',
                'ui:options': {
                    showQrScanner: true,
                    showENSLookup: true
                }
            },
            network: {
                'ui:widget': 'radio',
                'ui:options': {
                    inline: true
                }
            }
        },
        features: {
            'ui:widget': 'checkboxes',
            'ui:options': {
                inline: true
            }
        }
    },
    formData: {
        projectName: '',
        themeColors: {
            primary: '#1976d2',
            secondary: '#388e3c',
            accent: '#d32f2f'
        },
        contractDetails: {
            network: 'mainnet',
            chainId: 1
        }
    },
};

export default formConfig;