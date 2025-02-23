import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import validator from '@rjsf/validator-ajv8';
import { forwardRef, useCallback } from 'react';
import { useStore } from '@/store';
import Editors from '@/components/editor';
import { IChangeEvent } from '@rjsf/core';

const CnForm = withTheme(shadcnTheme);

export const AppMainContent = forwardRef<any>((_, ref) => {
  const {
    currentSampleData,
    currentFormData,
    liveSettings,
    setCurrentSampleUiSchema,
    setCurrentSampleSchema,
    setCurrentSampleExtraErrorSchema,
    setCurrentFormData,
  } = useStore((state) => state);

  const onFormDataChange = useCallback(
    ({ formData }: IChangeEvent, id?: string) => {
      if (id) {
        console.log('Field changed, id: ', id);
      }
      setCurrentFormData(formData);
    },
    [setCurrentFormData]
  );

  return (
    <div className="size-full p-4 flex flex-row gap-2">
      <div className="w-[500px]">
        <Editors
          formData={currentFormData}
          setFormData={setCurrentFormData}
          schema={currentSampleData.schema}
          setSchema={setCurrentSampleSchema}
          uiSchema={currentSampleData.uiSchema}
          setUiSchema={setCurrentSampleUiSchema}
          extraErrors={currentSampleData.extraErrors}
          setExtraErrors={setCurrentSampleExtraErrorSchema}
        />
      </div>
      <div className="grow px-4">
        <CnForm
          noHtml5Validate
          schema={currentSampleData.schema}
          uiSchema={currentSampleData.uiSchema}
          formData={currentFormData}
          onChange={onFormDataChange}
          validator={validator}
          extraErrors={currentSampleData.extraErrors}
          {...liveSettings}
          ref={ref}
        />
      </div>
    </div>
  );
});

AppMainContent.displayName = 'AppMainContent';
