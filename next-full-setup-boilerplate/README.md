First install the dependencies from npm, along with a validator implementation (such as @rjsf/validator-ajv8):
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 --save
```

Install package using npm
```
npm install @rjsf/shadcn
```
Or build local artifact file
```bash
cd packages/shadcn
npm pack
```
Copy the built file to your app, e.g: artifacts folder. And then add into package.json
```
"@rjsf/shadcn": "file:/./artifacts/rjsf-shadcn-5.24.4.tgz"
```
Run `npm install`

In tailwind.config.ts, add to content array

```ts
"node_modules/@rjsf/shadcn/src/**/*.{js,ts,jsx,tsx,mdx}"
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
