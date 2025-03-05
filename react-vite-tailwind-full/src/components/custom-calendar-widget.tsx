import { WidgetProps } from '@rjsf/utils';
import Calendar from 'react-calendar';
import {
  Dumbbell,
  Activity,
  Heart,
  UsersRound,
  LucideIcon,
} from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const bodyPartIcons: Record<string, LucideIcon> = {
  arms: Dumbbell,
  legs: Activity,
  core: Heart,
  chest: UsersRound,
  back: Activity,
  shoulders: Dumbbell,
};

interface CustomCalendarWidgetProps extends WidgetProps {
  options: Record<string, any>;
}

const CustomCalendarWidget = ({
  value,
  onChange,
  registry,
}: CustomCalendarWidgetProps) => {
  const formContext = registry.formContext;
  const bodyParts = formContext?.formData?.bodyParts || [];

  const handleDateChange = (date: Date | null | unknown) => {
    // Adjust for timezone and format as YYYY-MM-DD
    if (!date) return;
    // @ts-ignore
    const year = date.getFullYear();
    // @ts-ignore
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // @ts-ignore
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    onChange(formattedDate);
  };

  const parseDate = (dateString: string) => {
    if (!dateString) return new Date();
    // Create date without timezone conversion
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // @ts-ignore
  const renderTileContent = ({ view }) => {
    if (view === 'month') {
      return (
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {bodyParts.map((part: string) => {
            const Icon = bodyPartIcons[part];
            return (
              Icon && (
                <Icon
                  key={part}
                  className="text-muted-foreground dark:text-muted-foreground"
                  size={16}
                />
              )
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-background rounded-lg shadow-sm border dark:border-slate-800">
      <Calendar
        onChange={handleDateChange}
        value={parseDate(value)}
        tileContent={renderTileContent}
        className="react-calendar"
      />
    </div>
  );
};

export default CustomCalendarWidget;
