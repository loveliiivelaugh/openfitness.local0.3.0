import * as React from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';


const ChartButtons = (props: any) => {
    const [showButtons, setShowButtons] = React.useState(false);
    const buttons = [
        {
            label: "Bar",
            value: "bar",
            // icon: <BarChartOutlined />
        },
        {
            label: "Line",
            value: "line",
            // icon: <LineAxisOutlined />
        },
        {
            label: "Pie",
            value: "pie",
            // icon: <PieChartOutline />
        },
        {
            label: "Table",
            value: "table",
            // icon: <TableChart />
        },
        {
            label: "Expand",
            value: "expand",
            // icon: <Expand />
        },
        {
            label: "Export",
            value: "export",
            // icon: <Download />
        },
        {
            label: "Import",
            value: "import",
            // icon: <Upload />
        }
    ];

    return (
        <Box sx={{ display:"flex", justifyContent: "space-between", gap: 1 }}>
            <Button color="inherit" onClick={() => setShowButtons(!showButtons)}>
                {/* {showButtons ? <ArrowRight /> : <ArrowLeft />} */}
            </Button>
            {showButtons && buttons.map((button) => (
                <Button
                    key={`${button.value}-chart-button`}
                    color="inherit"
                    onClick={() => props.setActiveChart(button.value)}
                >
                    {button.label}
                    {/* {button?.icon || button.label} */}
                </Button>
            ))}
        </Box>
    );
};

export default ChartButtons;