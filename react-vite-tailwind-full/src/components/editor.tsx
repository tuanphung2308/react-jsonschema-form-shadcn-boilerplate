import { useCallback, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { ErrorSchema, RJSFSchema, UiSchema } from '@rjsf/utils';
import isEqualWith from 'lodash/isEqualWith';
import { useTheme } from 'next-themes';
import { useDirectionContext } from '@/contexts/direction-context';

const monacoEditorOptions = {
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  wordWrap: 'on',
  renderControlCharacters: true,
  renderValidationDecorations: 'on',
  renderWhitespace: 'all',
};

type EditorProps = {
  title: string;
  code: string;
  onChange: (code: string) => void;
};

function Editor({ title, code, onChange }: EditorProps) {
  const [valid, setValid] = useState(true);
  const { theme } = useTheme();
  const { direction } = useDirectionContext();

  const onCodeChange = useCallback(
    (code: string | undefined) => {
      if (!code) {
        return;
      }

      try {
        const parsedCode = JSON.parse(code);
        setValid(true);
        onChange(parsedCode);
      } catch (err) {
        setValid(false);
      }
    },
    [setValid, onChange]
  );

  const editorOptions = {
    ...monacoEditorOptions,
    // Force LTR for the editor content
    rightToLeft: false,
  };

  return (
    <div className="border rounded-lg shadow">
      <div className="p-3 border-b">
        <span className={`${valid ? 'text-green-500' : 'text-red-500'} mr-2`}>
          {valid ? '✓' : '✗'}
        </span>
        {title}
      </div>
      <div className={direction === 'rtl' ? 'direction-rtl' : ''}>
        <MonacoEditor
          language="json"
          value={code}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          onChange={onCodeChange}
          height={400}
          options={editorOptions}
        />
      </div>
    </div>
  );
}

const toJson = (val: unknown) => JSON.stringify(val, null, 2);

type EditorsProps = {
  schema: RJSFSchema;
  setSchema: React.Dispatch<React.SetStateAction<RJSFSchema>>;
  uiSchema: UiSchema;
  setUiSchema: React.Dispatch<React.SetStateAction<UiSchema>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  extraErrors: ErrorSchema | undefined;
  setExtraErrors: React.Dispatch<React.SetStateAction<ErrorSchema | undefined>>;
};

export default function Editors({
  extraErrors,
  formData,
  schema,
  uiSchema,
  setExtraErrors,
  setFormData,
  setSchema,
  setUiSchema,
}: EditorsProps) {
  const onSchemaEdited = useCallback(
    (newSchema) => {
      setSchema(newSchema);
    },
    [setSchema]
  );

  const onUISchemaEdited = useCallback(
    (newUiSchema) => {
      setUiSchema(newUiSchema);
    },
    [setUiSchema]
  );

  const onFormDataEdited = useCallback(
    (newFormData) => {
      if (
        !isEqualWith(newFormData, formData, (newValue, oldValue) => {
          // Since this is coming from the editor which uses JSON.stringify to trim undefined values compare the values
          // using JSON.stringify to see if the trimmed formData is the same as the untrimmed state
          // Sometimes passing the trimmed value back into the Form causes the defaults to be improperly assigned
          return JSON.stringify(oldValue) === JSON.stringify(newValue);
        })
      ) {
        setFormData(newFormData);
      }
    },
    [formData, setFormData]
  );

  const onExtraErrorsEdited = useCallback(
    (newExtraErrors) => {
      setExtraErrors(newExtraErrors);
    },
    [setExtraErrors]
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <Editor
        title="JSONSchema"
        code={toJson(schema)}
        onChange={onSchemaEdited}
      />
      <div className="flex gap-4">
        <div className="w-1/2">
          <Editor
            title="UISchema"
            code={toJson(uiSchema)}
            onChange={onUISchemaEdited}
          />
        </div>
        <div className="w-1/2">
          <Editor
            title="formData"
            code={toJson(formData)}
            onChange={onFormDataEdited}
          />
        </div>
      </div>
      {extraErrors && (
        <div className="flex">
          <div className="w-full">
            <Editor
              title="extraErrors"
              code={toJson(extraErrors || {})}
              onChange={onExtraErrorsEdited}
            />
          </div>
        </div>
      )}
    </div>
  );
}
