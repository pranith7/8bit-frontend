import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface UpdateIndicatorProps {
  lastUpdated: Date;
  isUpdating: boolean;
}

const UpdateIndicator: React.FC<UpdateIndicatorProps> = ({ lastUpdated, isUpdating }) => {
  const [timeUntilNextUpdate, setTimeUntilNextUpdate] = useState(15);

  useEffect(() => {
    if (isUpdating) {
      setTimeUntilNextUpdate(15);
      return;
    }

    const interval = setInterval(() => {
      setTimeUntilNextUpdate(prev => {
        if (prev <= 1) {
          return 15; // Reset to 15 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isUpdating]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin text-blue-600' : ''}`} />
      <div className="flex flex-col">
        <span>
          Last updated: {formatTime(lastUpdated)}
          {isUpdating && <span className="text-blue-600 ml-1">Updating...</span>}
        </span>
        {!isUpdating && (
          <span className="text-xs text-gray-500">
            Next update in {timeUntilNextUpdate}s
          </span>
        )}
      </div>
    </div>
  );
};

export default UpdateIndicator;