'use client';

import * as React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { samples, Sample } from '@/samples';
import { useStore } from '@/store';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentSample, setCurrentSample } = useStore((state) => state);

  // Memoize sample keys to prevent recreation on each render
  const sampleKeys = React.useMemo(() => Object.keys(samples) as Sample[], []);

  // Memoize click handler
  const handleSampleClick = React.useCallback(
    (sampleKey: Sample) => {
      setCurrentSample(sampleKey);
    },
    [setCurrentSample]
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">JSON Schema</span>
                  <span className="">Samples</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sampleKeys.map((sampleKey) => (
              <SidebarMenuItem key={sampleKey}>
                <SidebarMenuButton
                  asChild
                  onClick={() => handleSampleClick(sampleKey)}
                >
                  <button
                    className={`w-full rounded-md px-2 py-1 text-left font-medium transition-colors ${
                      currentSample === sampleKey
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {sampleKey}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
