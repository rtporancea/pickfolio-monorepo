import { cn } from '../utils/cn';
import { HTMLAttributes, forwardRef } from 'react';

/*
 * HEADINGS
 */
export const Heading1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h1 ref={ref} className={cn('text-3xl sm:text-5xl font-bold uppercase', className)} {...props} />
    ),
);
Heading1.displayName = 'Heading1';

export const Heading2 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h2 ref={ref} className={cn('text-xl sm:text-3xl font-bold uppercase', className)} {...props} />
    ),
);
Heading2.displayName = 'Heading2';

export const Heading3 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => <h3 ref={ref} className={cn('text-xl font-bold', className)} {...props} />,
);
Heading3.displayName = 'Heading3';

/*
 * BODIES
 */
export const BodyMedium = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => <p ref={ref} className={cn('text-base font-medium', className)} {...props} />,
);
BodyMedium.displayName = 'BodyMedium';

export const BodySmall = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => <p ref={ref} className={cn('text-xs', className)} {...props} />,
);
BodySmall.displayName = 'BodySmall';
