import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import validator from '@rjsf/validator-ajv8';
import { FormEvent, forwardRef, useCallback } from 'react';
import { useStore } from '@/store';
import Editors from '@/components/editor';
import { IChangeEvent } from '@rjsf/core';
import { useToast } from '@/hooks/use-toast';
import allWidget from "@/samples/custom-components/allWidget.ts";

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

  const { toast } = useToast();

  const onFormDataChange = useCallback(
    ({ formData }: IChangeEvent, id?: string) => {
      if (id) {
        console.log('Field changed, id: ', id);
      }
      setCurrentFormData(formData);
    },
    [setCurrentFormData]
  );

  const onFormDataSubmit = useCallback(
    ({ formData }: IChangeEvent, event: FormEvent<any>) => {
      console.log('submitted formData', formData);
      console.log('submit event', event);
      toast({
        title: 'Form submitted',
      });
    },
    [toast]
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
          onSubmit={onFormDataSubmit}
          validator={validator}
          extraErrors={currentSampleData.extraErrors}
          widgets={allWidget}
          {...liveSettings}
          ref={ref}
        />
      </div>
    </div>
  );
});

AppMainContent.displayName = 'AppMainContent';
