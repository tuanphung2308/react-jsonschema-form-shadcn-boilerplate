'use client';

import React from 'react';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import {
  DirectionProvider,
  useDirectionContext,
} from '@/contexts/direction-context';

export function DirectionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DirectionProvider>
      <RadixWrapper>{children}</RadixWrapper>
    </DirectionProvider>
  );
}

function RadixWrapper({ children }: { children: React.ReactNode }) {
  const { direction } = useDirectionContext();
  return (
    <RadixDirectionProvider dir={direction}>{children}</RadixDirectionProvider>
  );
}
