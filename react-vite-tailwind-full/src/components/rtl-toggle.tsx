'use client';

import * as React from 'react';
import { LanguagesIcon } from 'lucide-react';
import { useDirectionContext } from '@/contexts/direction-context';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function RTLToggle() {
  const { setDirection } = useDirectionContext();

  const handleDirectionChange = (dir: 'ltr' | 'rtl') => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.classList.remove('ltr', 'rtl');
    document.documentElement.classList.add(dir);
    setDirection(dir);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle direction</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDirectionChange('ltr')}>
          LTR
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDirectionChange('rtl')}>
          RTL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
