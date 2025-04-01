# React JSONSchema Form with Vite, Tailwind, and Shadcn

A complete setup guide for using React JSONSchema Form with Vite, Tailwind CSS, and Shadcn theme.
## Official V6
We are getting official support for v6 [here](https://github.com/rjsf-team/react-jsonschema-form/pull/4520#event-16931819691). This is for v5.   
## Project Setup

### Create Vite Project
```bash
npm create vite@latest myapp -- --template react-ts
```

### Core Dependencies

Install RJSF core packages:
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/shadcn --save
```

### Tailwind CSS Setup

1. Install Tailwind:
```bash
npm install -D tailwindcss@3
npx tailwindcss init
```

2. Configure Tailwind (`tailwind.config.ts`):
```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/@rjsf/shadcn/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],  
}
```

3. Add Tailwind directives to your CSS:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## TypeScript Configuration

### Path Aliases Setup

1. Update `tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. Update `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite Configuration

1. Install required dependency:
```bash
npm install -D @types/node
```

2. Update `vite.config.ts`:
```ts
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
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
3. You can refer to `direction-context.tsx`, `direction-provider.tsx` and `rtl-toggle.tsx` for implementation.

### Tailwind v4
Add the following line to your equivalent global.css
```
@source "../node_modules/@rjsf/shadcn";
```
