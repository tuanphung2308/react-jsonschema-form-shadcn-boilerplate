import { JSONSchema7 } from 'json-schema';

interface CustomError {
    name: string;
    property: string;
    message: string;
}

interface FormErrors {
    addError: (message: string) => void;
}

interface ValidationErrors {
    [key: string]: FormErrors;
}

type ValidateFunction = (formData: FormData, errors: ValidationErrors) => ValidationErrors;
type TransformErrorsFunction = (errors: CustomError[]) => CustomError[];

interface FormData {
    contractName?: string;
    contractVersion?: string;
    ownerAddress?: string;
    initialSupply?: number;
    gasLimit?: number;
    contractType?: 'ERC20' | 'ERC721' | 'ERC1155' | 'Custom';
    constructorArgs?: string[];
}

interface UISchema {
    [key: string]: {
        'ui:widget'?: string;
        'ui:help'?: string;
    };
}

const formConfig: {
    schema: JSONSchema7;
    uiSchema: UISchema;
    formData: FormData;
    validate: ValidateFunction;
    transformErrors: TransformErrorsFunction;
} = {
    schema: {
        title: 'Smart Contract Deployment Form',
        description: 'Validation schema for Ethereum smart contract deployment parameters',
        type: 'object',
        properties: {
            contractName: {
                title: 'Contract Name',
                type: 'string',
                pattern: '^[A-Z][a-zA-Z0-9]*$',
                minLength: 1
            },
            contractVersion: {
                title: 'Solidity Version',
                type: 'string',
                pattern: '^\\^?0\\.[0-9]\\.[0-9]+$',
                default: '^0.8.0'
            },
            ownerAddress: {
                title: 'Owner Address',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]{40}$'
            },
            initialSupply: {
                title: 'Initial Token Supply',
                type: 'number',
                minimum: 0,
                multipleOf: 1
            },
            gasLimit: {
                title: 'Gas Limit',
                type: 'number',
                minimum: 21000,
                maximum: 30000000
            },
            contractType: {
                title: 'Contract Type',
                type: 'string',
                enum: ['ERC20', 'ERC721', 'ERC1155', 'Custom']
            },
            constructorArgs: {
                title: 'Constructor Arguments',
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        },
        required: ['contractName', 'contractVersion', 'ownerAddress', 'contractType']
    },
    uiSchema: {
        contractVersion: {
            'ui:help': 'Specify Solidity compiler version (e.g., ^0.8.0)'
        },
        ownerAddress: {
            'ui:help': 'Ethereum address that will own the contract'
        },
        gasLimit: {
            'ui:widget': 'range'
        },
        constructorArgs: {
            'ui:help': 'Enter constructor arguments in order'
        }
    },
    formData: {
        contractVersion: '^0.8.0',
        gasLimit: 3000000,
        contractType: 'ERC20' as const
    },
    validate: (formData: FormData, errors: ValidationErrors): ValidationErrors => {
        if (formData.contractType === 'ERC20' && !formData.initialSupply) {
            errors.initialSupply.addError('Initial supply is required for ERC20 tokens');
        }
        return errors;
    },
    transformErrors: (errors: CustomError[]): CustomError[] => {
        return errors.map((error: CustomError) => {
            if (error.property === '.ownerAddress' && error.name === 'pattern') {
                error.message = 'Please enter a valid Ethereum address (0x...)';
            }
            return error;
        });
    }
};

export default formConfig;