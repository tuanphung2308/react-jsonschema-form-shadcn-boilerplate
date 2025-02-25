import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { HexColorPicker } from 'react-colorful';
import { WidgetProps } from '@rjsf/utils';

interface ColorPickerCustomOptions {
  showPalette?: boolean;
  presetColors?: string[];
}

export const ColorPickerWidget: React.FC<WidgetProps> = (props) => {
  const { onChange, value, options } = props;
  const customOptions = options as ColorPickerCustomOptions;

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: value }}
              />
              <span>{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={value} onChange={onChange} />
          {customOptions?.showPalette && (
            <div className="mt-4 flex flex-wrap gap-1">
              {customOptions.presetColors?.map((color) => (
                <button
                  key={color}
                  className="h-6 w-6 rounded-md border"
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
