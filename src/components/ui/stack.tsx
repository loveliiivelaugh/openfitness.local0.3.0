import React, { ReactNode } from 'react';

interface StackProps {
    children: ReactNode;
    direction?: 'row' | 'column';
    spacing?: number; // spacing in units of Tailwind's default spacing (e.g., 4 for 1rem)
    className?: string;
}

const Stack: React.FC<StackProps> = ({
    children,
    direction = 'column',
    spacing = 4,
    className = '',
}) => {
    const spacingClass = `space-${spacing}`; // Tailwind CSS class for spacing

    return (
        <div
            className={`${direction === 'row' ? 'flex flex-row' : 'flex flex-col'} ${spacingClass} ${className}`}
        >
            {React.Children.map(children, (child) => (
                <div className={spacing > 0 ? `mb-${spacing}` : ''}>{child}</div>
            ))}
        </div>
    );
};

export { Stack };

// // Usage Example
// const App: React.FC = () => {
//     return (
//         <div className="p-4">
//             <Stack direction="column" spacing={4}>
//                 <div className="bg-blue-500 p-4 text-white">Item 1</div>
//                 <div className="bg-green-500 p-4 text-white">Item 2</div>
//                 <div className="bg-red-500 p-4 text-white">Item 3</div>
//             </Stack>

//             <Stack direction="row" spacing={2} className="mt-6">
//                 <div className="bg-purple-500 p-4 text-white">Item A</div>
//                 <div className="bg-yellow-500 p-4 text-white">Item B</div>
//                 <div className="bg-pink-500 p-4 text-white">Item C</div>
//             </Stack>
//         </div>
//     );
// };

// export default App;
