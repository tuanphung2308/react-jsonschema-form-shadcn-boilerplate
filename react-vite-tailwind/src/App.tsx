import './App.css'

import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
    "definitions": {
        "Color": {
            "title": "Color",
            "type": "string",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        "#ff0000"
                    ],
                    "title": "Red"
                },
                {
                    "type": "string",
                    "enum": [
                        "#00ff00"
                    ],
                    "title": "Green"
                },
                {
                    "type": "string",
                    "enum": [
                        "#0000ff"
                    ],
                    "title": "Blue"
                }
            ]
        },
        "Toggle": {
            "title": "Toggle",
            "type": "boolean",
            "oneOf": [
                {
                    "title": "Enable",
                    "const": true
                },
                {
                    "title": "Disable",
                    "const": false
                }
            ]
        }
    },
    "title": "Image editor",
    "type": "object",
    "required": [
        "currentColor",
        "colorMask",
        "blendMode"
    ],
    "properties": {
        "currentColor": {
            "$ref": "#/definitions/Color",
            "title": "Brush color"
        },
        "colorMask": {
            "type": "array",
            "uniqueItems": true,
            "items": {
                "$ref": "#/definitions/Color"
            },
            "title": "Color mask"
        },
        "toggleMask": {
            "title": "Apply color mask",
            "$ref": "#/definitions/Toggle"
        },
        "colorPalette": {
            "type": "array",
            "title": "Color palette",
            "items": {
                "$ref": "#/definitions/Color"
            }
        },
        "blendMode": {
            "title": "Blend mode",
            "type": "string",
            "oneOf": [
                {
                    "const": "screen",
                    "title": "Screen"
                },
                {
                    "const": "multiply",
                    "title": "Multiply"
                },
                {
                    "const": "overlay",
                    "title": "Overlay"
                }
            ]
        }
    }
};
const Form = withTheme(shadcnTheme);

function App() {

  return (
      <div className='h-screen w-screen flex items-center justify-center'>
          <div className='w-4/5'>
              <Form schema={schema} validator={validator} />
          </div>
      </div>
  );
}

export default App
