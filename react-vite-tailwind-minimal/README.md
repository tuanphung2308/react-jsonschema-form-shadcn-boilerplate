Create react with vite app
```
npm create vite@latest myapp -- --template react-ts
```

First install the dependencies from npm, along with a validator implementation (such as @rjsf/validator-ajv8):
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 --save
```

Install package using npm
```
npm install @rjsf/shadcn
```

Install Tailwind CSS
```bash
npm install -D tailwindcss@3
npx tailwindcss init
```

Configure your template paths
```ts
 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {},
   },
   plugins: [],
 }
```

In tailwind.config.ts, add to content array

```ts
"node_modules/@rjsf/shadcn/src/**/*.{js,ts,jsx,tsx,mdx}"
```

Add the Tailwind directives to your CSS
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now using it with normal usage
```ts
import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
const schema: RJSFSchema = {}; // Your schema
const Form = withTheme(shadcnTheme);

export default function App() {
    return <Form schema={schema} validator={validator} />;
}
```