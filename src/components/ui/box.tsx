import React, { ReactNode, CSSProperties } from 'react';

interface BoxProps {
    children: ReactNode;
    className?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    style?: CSSProperties;
    sx?: CSSProperties;
}

const Box: React.FC<BoxProps> = ({
    children,
    className = '',
    padding = 'p-4',
    margin = 'm-0',
    backgroundColor = 'bg-white',
    style,
    sx,
}) => {
    return (
        <div
            className={`${padding} ${margin} ${backgroundColor} ${className}`}
            style={{
                ...style,
                ...sx,
            }}
        >
            {children}
        </div>
    );
};

export { Box };
