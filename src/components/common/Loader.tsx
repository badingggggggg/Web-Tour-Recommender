import React from 'react';
import cn from 'classnames';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = 'text-gray-800'
}) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader className={cn('animate-spin', className)} />
    </div>
  );
};
