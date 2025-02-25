import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';

export const ImageUploadWidget: React.FC<WidgetProps> = ({
  id,
  onChange,
  disabled,
  readonly,
  label,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-widget">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleImageChange}
        disabled={disabled || readonly}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: '200px', marginTop: '10px' }}
        />
      )}
    </div>
  );
};
