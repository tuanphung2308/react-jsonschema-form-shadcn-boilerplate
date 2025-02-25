import { WidgetProps } from '@rjsf/utils';
import Select, { MultiValue } from 'react-select';

interface Option {
  label: string;
  value: string;
}

export const CustomMultiSelectWidget: React.FC<WidgetProps> = ({
  id,
  options,
  value,
  onChange,
  disabled,
  readonly,
  label,
}) => {
  const selectOptions: Option[] =
    options.enumOptions?.map((option) => ({
      label: option.label,
      value: option.value,
    })) || [];

  const selectedValues = Array.isArray(value)
    ? selectOptions.filter((option) => value.includes(option.value))
    : [];

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map((option) => option.value));
  };

  return (
    <div className="custom-multi-select">
      <label htmlFor={id}>{label}</label>
      <Select
        id={id}
        isMulti
        options={selectOptions}
        value={selectedValues}
        onChange={handleChange}
        isDisabled={disabled || readonly}
        closeMenuOnSelect={false}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '38px',
            borderColor: '#ced4da',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#e9ecef',
          }),
        }}
      />
    </div>
  );
};
