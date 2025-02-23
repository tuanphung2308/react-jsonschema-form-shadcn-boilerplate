import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { ChevronDown, Cog } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import { useStore } from '@/store';
import { IChangeEvent } from '@rjsf/core';
import {
  liveSettingsBooleanSchema,
  liveSettingsBooleanUiSchema,
  liveSettingsSelectSchema,
  liveSettingsSelectUiSchema,
} from '@/constants';
import validator from '@rjsf/validator-ajv8';
import { withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import RawValidatorTest from '@/components/raw-validator-test';

const CnForm = withTheme(shadcnTheme);

interface AppSettingsSidebarProps {
  formRef: React.RefObject<any>;
}

export function AppSettingsSidebar({ formRef }: AppSettingsSidebarProps) {
  const { currentSampleData, liveSettings, setLiveSettings } = useStore(
    (state) => state
  );

  const handleSetLiveSettings = useCallback(
    ({ formData }: IChangeEvent) => {
      setLiveSettings(formData);
    },
    [setLiveSettings]
  );

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Cog className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Configuration</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className="text-base">Boolean settings</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <CnForm
                idPrefix="rjsf_options"
                schema={liveSettingsBooleanSchema}
                validator={validator}
                formData={liveSettings}
                onChange={handleSetLiveSettings}
                uiSchema={liveSettingsBooleanUiSchema}
              >
                <div />
              </CnForm>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarSeparator className="my-4" />
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className="text-base">Select settings</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <CnForm
                idPrefix="rjsf_options"
                schema={liveSettingsSelectSchema}
                validator={validator}
                formData={liveSettings}
                onChange={handleSetLiveSettings}
                uiSchema={liveSettingsSelectUiSchema}
              >
                <div />
              </CnForm>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup>
          <div className="flex flex-row flex-wrap gap-2">
            <Button
              className="flex-1"
              title="Click me to submit the form programmatically."
              onClick={() => formRef.current?.submit()}
            >
              Submit
            </Button>
            <Button
              className="flex-1"
              title="Click me to validate the form programmatically."
              onClick={() => formRef.current?.validateForm()}
            >
              Validate
            </Button>
            <Button
              className="flex-1"
              title="Click me to reset the form programmatically."
              onClick={() => formRef.current?.reset()}
            >
              Reset
            </Button>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <RawValidatorTest
            validator={validator}
            schema={currentSampleData.schema}
            formData={liveSettings}
          />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
