import { useResolveClassNames } from 'uniwind';
import type { LucideIcon } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import * as React from 'react';

type IconProps = {
  as: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function Icon({ as: LucideIconComponent, size = 24, strokeWidth = 2, className, ...props }: IconProps) {
  const resolvedClassName = cn('text-foreground', className);
  const style = useResolveClassNames(resolvedClassName);

  return (
    <LucideIconComponent
      size={size}
      strokeWidth={strokeWidth}
      color={(style as any)?.color}
      style={style}
      {...props}
    />
  );
}

export { Icon };
export type { IconProps };
