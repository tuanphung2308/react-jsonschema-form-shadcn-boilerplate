'use client';

import { AppSidebar } from '@/components/app/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { useStore } from '@/store';
import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import {samples} from "@/samples";
import {JSONSchema7} from "json-schema";
const Form = withTheme(shadcnTheme);

export default function Page() {
  const { currentSample } = useStore((state) => state);
  const currentSchema = samples[currentSample] as unknown as {
    schema: JSONSchema7 | RJSFSchema
    uiSchema: object
    formData?: object
  };

  // @ts-ignore
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b pr-4">
          <div className="flex flex-row justify-between w-full">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      JSON Schema Samples
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentSample}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </div>
        </header>
        <div className='size-full p-4'>
          <Form
              noHtml5Validate
              schema={currentSchema.schema}
              uiSchema={currentSchema.uiSchema}
              formSchema={currentSchema.formData ?? {}}
              validator={validator}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
