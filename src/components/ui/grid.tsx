import { ReactNode } from "react";

interface GridProps {
    children: ReactNode;
    className?: string;
    container?: boolean;
}

const Grid: React.FC<GridProps> = ({ 
    children, 
    className = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    ...props
}) => {
    if ((props as any)?.container) {}
    return (
        <div className={`grid gap-4 ${className}`}>
            {children}
        </div>
    );
};

interface GridItemProps {
    children: ReactNode;
    span?: number;
    className?: string;
    size?: string | number;
}

const GridItem: React.FC<GridItemProps> = ({ children, span = 1, className, ...props }) => {
    const spanClasses = span ? `col-span-${span}` : '';
    if ((props as any)?.size) {}
    return (
        <div className={`bg-white shadow p-4 rounded ${spanClasses} ${className}`}>
            {children}
        </div>
    );
};

export { Grid, GridItem }