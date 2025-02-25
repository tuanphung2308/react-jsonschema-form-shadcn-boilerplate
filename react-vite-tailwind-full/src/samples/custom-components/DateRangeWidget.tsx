import React from 'react';
import {Calendar} from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {WidgetProps} from '@rjsf/utils';

export const DateRangeWidget: React.FC<WidgetProps> = ({value, onChange}) => {
    const [date, setDate] = React.useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: value.start ? new Date(value.start) : undefined,
        to: value.end ? new Date(value.end) : undefined,
    });

    return (
        <div className="flex flex-col gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[300px] justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        selected={{
                            from: date.from ?? new Date(),
                            to: date.to ?? new Date(),
                        }}
                        onSelect={(range) => {
                            if (range && range.from && range.to) {
                                // @ts-ignore
                                setDate(range);
                                onChange({
                                    start: range?.from?.toISOString(),
                                    end: range?.to?.toISOString(),
                                });
                            }
                        }}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
