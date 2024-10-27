import { Grid } from '@/components/ui/grid';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const FilterButtons = (props: any) => {

    const filterButtons = ["Today", "Yesterday", "Last Week", "Last 30 Days", "All Time"];
    return (
        <Grid container>
            {filterButtons.map((button) => (
                <Grid key={`${button}-filter-button`}>
                    <Button
                        key={`${button}-filter-button`}
                        color="inherit"
                        onClick={() => props.setFilter(button)}
                    >
                        <Typography variant="caption">{button}</Typography>
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
};

export default FilterButtons;