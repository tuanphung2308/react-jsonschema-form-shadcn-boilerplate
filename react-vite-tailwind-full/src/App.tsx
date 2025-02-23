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
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { useStore } from '@/store';
import { IChangeEvent, withTheme } from '@rjsf/core';
import { Theme as shadcnTheme } from '@rjsf/shadcn';
import { ErrorSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { RTLToggle } from '@/components/rtl-toggle';
import './App.css';
import './styles/rtl.css';
import { useCallback, useRef, useState } from 'react';
import {
  LiveSettings,
  liveSettingsBooleanSchema,
  liveSettingsBooleanUiSchema,
  liveSettingsSelectSchema,
  liveSettingsSelectUiSchema,
} from './constants';
import { ChevronDown, Cog } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import Editors from '@/components/editor.tsx';
import { Button } from './components/ui/button';
import RawValidatorTest from './components/raw-validator-test';
// import Form from '@rjsf/core';
const CnForm = withTheme(shadcnTheme);

const defaultLiveSettings: LiveSettings = {
  showErrorList: 'bottom',
  validate: false,
  disabled: false,
  noHtml5Validate: false,
  readonly: false,
  omitExtraData: false,
  liveOmit: false,
  experimental_defaultFormStateBehavior: {
    // arrayMinItems: {
    //   populate: 'never',
    //   mergeExtraDefaults: 'populateDefaults'
    // },
    emptyObjectFields: 'skipDefaults',
  },
};

function App() {
  const {
    currentSample,
    currentSampleData,
    setCurrentSampleUiSchema,
    setCurrentSampleSchema,
    setCurrentSampleExtraErrorSchema,
  } = useStore((state) => state);

  const playGroundFormRef = useRef<any>(null);

  const [liveSettings, setLiveSettings] =
    useState<LiveSettings>(defaultLiveSettings);

  const handleSetLiveSettings = useCallback(
    ({ formData }: IChangeEvent) => {
      setLiveSettings((previousLiveSettings) => ({
        ...previousLiveSettings,
        ...formData,
      }));
    },
    [setLiveSettings]
  );

  const [formData, setFormData] = useState<any>(
    currentSampleData.formData ?? {}
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 rtl:pr-0">
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
            <div className="flex items-center gap-2">
              <RTLToggle />
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="size-full p-4 flex flex-row gap-2">
          <div className="w-[500px]">
            <Editors
              formData={formData}
              setFormData={setFormData}
              schema={currentSampleData.schema}
              setSchema={setCurrentSampleSchema}
              uiSchema={currentSampleData.uiSchema}
              setUiSchema={setCurrentSampleUiSchema}
              extraErrors={currentSampleData.extraErrors}
              setExtraErrors={(value) =>
                setCurrentSampleExtraErrorSchema(value as ErrorSchema)
              }
            />
          </div>
          <div className="grow px-4">
            <CnForm
              noHtml5Validate
              schema={currentSampleData.schema}
              uiSchema={currentSampleData.uiSchema}
              formData={formData}
              onChange={(e) => setFormData(e.formData)}
              validator={validator}
              {...liveSettings} // Only spread liveSettings, remove defaultLiveSettings
              ref={playGroundFormRef}
            />
          </div>
        </div>
      </SidebarInset>
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
                  // validator={localValidator}
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
                  // validator={localValidator}
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
                onClick={() => playGroundFormRef.current.submit()}
              >
                Submit
              </Button>
              <Button
                className="flex-1"
                title="Click me to validate the form programmatically."
                onClick={() => playGroundFormRef.current.validateForm()}
              >
                Validate
              </Button>
              <Button
                className="flex-1"
                title="Click me to reset the form programmatically."
                onClick={() => playGroundFormRef.current.reset()}
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
    </SidebarProvider>
  );
}

export default App;
