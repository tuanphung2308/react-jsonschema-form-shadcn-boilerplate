# React JSONSchema Form - Shadcn Theme

A Shadcn theme for React JSONSchema Form.

## Installation

### Core Dependencies
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 --save
```

### Theme Installation

Choose one of the following methods:

#### Method 1: NPM Package  
```bash
npm install @rjsf/shadcn
```

#### Method 2: Local Build
1. Build the package locally:
```bash
cd packages/shadcn
npm pack
```

2. Copy the built file to your app's artifacts folder
3. Add to your package.json:
```json
{
  "dependencies": {
    "@rjsf/shadcn": "file:./artifacts/rjsf-shadcn-5.24.51.tgz"
  }
}
```

4. Install dependencies:
```bash
npm install
```

## Configuration

### Tailwind Setup
Add the following to your `tailwind.config.ts` content array:
```ts
{
  content: [
    "node_modules/@rjsf/shadcn/src/**/*.{js,ts,jsx,tsx,mdx}"
  ]
}
```

## Usage

Basic implementation example:
```tsx
import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const Form = withTheme(shadcnTheme);
const schema: RJSFSchema = {}; // Your schema

export default function App() {
    return <Form schema={schema} validator={validator} />;
}
```

## RTL Support

### Installation
```bash
npm install @radix-ui/react-direction --save
```

### Implementation

1. Wrap your layout with DirectionProvider:
```tsx
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction;

function Layout({ children, direction }) {
    return (
        <RadixDirectionProvider dir={direction}>
            {children}
        </RadixDirectionProvider>
    );
}
```

2. Set HTML direction attribute:
```html
<html dir="rtl">
```
## Demo Application
