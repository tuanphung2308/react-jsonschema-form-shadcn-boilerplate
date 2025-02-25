import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QrCodeIcon, SearchIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { WidgetProps } from '@rjsf/utils';

export const AddressWidget: React.FC<WidgetProps> = ({
  id,
  value,
  onChange,
  options,
}) => {
  const handleENSLookup = async () => {
    // Implement ENS lookup logic here
    toast({
      title: 'ENS Lookup',
      description: 'Looking up ENS name...',
    });
  };

  const handleQrScan = () => {
    // Implement QR scanning logic here
    toast({
      title: 'QR Scanner',
      description: 'Opening QR scanner...',
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0x..."
          className="font-mono"
        />
        {options?.showENSLookup && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleENSLookup}
            title="Lookup ENS name"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        )}
        {options?.showQrScanner && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleQrScan}
            title="Scan QR code"
          >
            <QrCodeIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {value && !value.match(/^0x[a-fA-F0-9]{40}$/) && (
        <p className="text-sm text-destructive">
          Please enter a valid Ethereum address
        </p>
      )}
    </div>
  );
};
