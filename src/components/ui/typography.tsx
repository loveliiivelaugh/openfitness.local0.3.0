import React, { ReactNode } from 'react';

interface TypographyProps {
    children: ReactNode;
    variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'subtitle1'
    | 'subtitle2';
    className?: string;
    align?: 'left' | 'center' | 'right';
    color?: string;
}

const Typography: React.FC<TypographyProps> = ({
    children,
    variant = 'body1',
    className = '',
    align = 'left',
    color = 'text-black',
}) => {
    const baseClasses = `text-${variant} ${color} text-${align}`;

    const variantClasses: Record<string, string> = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-bold',
        h4: 'text-xl font-bold',
        h5: 'text-lg font-semibold',
        h6: 'text-base font-semibold',
        body1: 'text-base',
        body2: 'text-sm',
        caption: 'text-xs',
        subtitle1: 'text-base font-medium',
        subtitle2: 'text-sm font-medium',
    };

    const Tag = variant.startsWith('h') ? variant : 'p'; // Use paragraph for body types

    return (
        // @ts-ignore
        <Tag className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </Tag>
    );
};

export { Typography };