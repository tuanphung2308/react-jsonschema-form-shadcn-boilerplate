Install package using npm
```
npm install @rjsf/shadcn
```
Or build local artifact file
```bash
cd packages/shadcn
npm pack
```
Copy the built file to your app, e.g: aritifacts folder. And then add into package.json
```
"@rjsf/shadcn": "file:/./artifacts/rjsf-shadcn-5.24.4.tgz"
```
Run `npm install`

In your component css file or global.css file, import the pre-built css file

```ts
import '@rjsf/shadcn/dist/blue.css';
```
Now using it with normal usage
```ts
import '@rjsf/shadcn/dist/blue.css';
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
