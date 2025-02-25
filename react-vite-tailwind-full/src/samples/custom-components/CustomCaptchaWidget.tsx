import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';

interface CaptchaImage {
  id: string;
  src: string;
  category: string;
}

export const CustomCaptchaWidget: React.FC<WidgetProps> = ({
  // id,
  // value,
  onChange,
  disabled,
  readonly,
}) => {
  const [images] = useState<CaptchaImage[]>([
    { id: '1', src: 'https://placehold.co/30x30.png', category: 'car' },
    { id: '2', src: 'https://placehold.co/30x30.png', category: 'car' },
    { id: '3', src: 'https://placehold.co/30x30.png', category: 'bike' },
    { id: '4', src: 'https://placehold.co/30x30.png', category: 'truck' },
    // ... more images
  ]);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelect = (imageId: string) => {
    const newSelection = selectedImages.includes(imageId)
      ? selectedImages.filter((id) => id !== imageId)
      : [...selectedImages, imageId];

    setSelectedImages(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="captcha-widget">
      <p>Select all images containing vehicles</p>
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`captcha-image ${
              selectedImages.includes(image.id) ? 'selected' : ''
            }`}
            onClick={() =>
              !disabled && !readonly && handleImageSelect(image.id)
            }
          >
            <img src={image.src} alt={image.category} />
          </div>
        ))}
      </div>
    </div>
  );
};
