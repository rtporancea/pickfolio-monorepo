import { cn } from '../utils/cn';
import { forwardRef, HTMLAttributes } from 'react';

interface GridLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const GridLayout = forwardRef<HTMLDivElement, GridLayoutProps>(({ children, className, ...props }, ref) => {
    return (
        <main
            ref={ref}
            className={cn(
                'grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-6 lg:grid-cols-12 lg:gap-10',
                'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10',
                'items-start w-full flex-1',
                className,
            )}
            {...props}
        >
            {children}
        </main>
    );
});
GridLayout.displayName = 'GridLayout';

type GridVariant = 'narrow' | 'wide';

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
    variant?: GridVariant;
    children: React.ReactNode;
}

export const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(
    ({ children, className, variant = 'wide', ...props }, ref) => {
        const contentClasses = {
            wide: 'col-span-4 sm:col-span-8 lg:col-start-2 lg:col-span-10',
            narrow: 'col-span-4 sm:col-start-2 sm:col-span-6 lg:col-start-4 lg:col-span-6',
        };

        // Spacing Normal inside: 16px mobile, 24px sm, 40px lg horizontal
        // 32px mobile/sm, 64px lg vertical
        return (
            <div
                ref={ref}
                className={cn(contentClasses[variant], 'p-6 lg:p-10 bg-white rounded-lg', className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);
GridContainer.displayName = 'GridContainer';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'subtle' | 'subtleStatic' | 'normal' | 'normalStatic' | 'loud' | 'loudStatic' | 'small';
    children: React.ReactNode;
}

export const HorizontalLayout = forwardRef<HTMLDivElement, LayoutProps>(
    ({ children, className, variant = 'subtle', ...props }, ref) => {
        const spacingClasses = {
            small: 'gap-2 sm:gap-2 lg:gap-2', // 8px on every screen
            subtle: 'gap-y-4 lg:gap-y-6', // 16px mobile/sm, 24px lg
            subtleStatic: 'gap-y-4', // 16px on every screen
            normal: 'gap-y-6 lg:gap-y-10', // 24px mobile/sm, 40px lg
            normalStatic: 'gap-y-6', // 24px on every screen
            loud: 'gap-y-8 lg:gap-y-16', // 32px mobile/sm, 64px lg
            loudStatic: 'gap-y-8', // 32px on every screen
        };
        return (
            <div
                ref={ref}
                className={cn(
                    'flex flex-col sm:flex-row *:flex-1',
                    'gap-x-4 sm:gap-x-6 lg:gap-x-10',
                    'items-center',
                    spacingClasses[variant],
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);
HorizontalLayout.displayName = 'HorizontalLayout';

export const VerticalLayout = forwardRef<HTMLDivElement, LayoutProps>(
    ({ children, className, variant = 'subtle', ...props }, ref) => {
        const spacingClasses = {
            small: 'gap-y-2', // 8px on every screen
            subtle: 'gap-y-4 lg:gap-y-6', // 16px mobile/sm, 24px lg
            subtleStatic: 'gap-y-4', // 16px on every screen
            normal: 'gap-y-6 lg:gap-y-10', // 24px mobile/sm, 40px lg
            normalStatic: 'gap-y-6', // 24px on every screen
            loud: 'gap-y-8 lg:gap-y-16', // 32px mobile/sm, 64px lg
            loudStatic: 'gap-y-8', // 32px on every screen
        };

        return (
            <div ref={ref} className={cn('flex flex-col w-full', spacingClasses[variant], className)} {...props}>
                {children}
            </div>
        );
    },
);
VerticalLayout.displayName = 'VerticalLayout';
