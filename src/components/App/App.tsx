// @ts-ignore
import ChartsContainer from 'mf2/ChartsContainer';
// @ts-ignore
import QueryWrapper from 'mf2/QueryWrapper';
// @ts-ignore
import { Button, Grid } from 'mf2/Mui';


const defaultCharts = {
    weight: "line",
    food: "bar",
    exercise: "bar",
    steps: "line",
    sleep: "bar",
};

const App = (
    props: any
    // // destructure the store needed to render less code
    // { stores: { utilityStore } }:
    // { stores?: any },
) => (
    <Grid container mt={10}>
        {/* {console.log("App.props: ", utilityStore) as any} */}
        <Grid>
            Openfitness2.1.mfe
            {console.logs("App.props: ", props)}
            <Button variant="outlined" color="inherit" onClick={() => props.router.go("/test")}>
                Go to WellnessPlannerUI
            </Button>
        </Grid>
        <QueryWrapper path={({ openfitnessTables }: { openfitnessTables: string }) => openfitnessTables}>
            {({ data }: { data: any }) => data && Object
                .keys(data.charts)
                .map((chart, index) => (
                    <Grid key={chart} size={{ xs: 12, sm: 12, md: !index ? 12 : 6 }}>
                        <ChartsContainer
                            label={`Fitness Tables ${chart}`}
                            charts={data.charts[chart]}
                            defaultChart={defaultCharts[chart as keyof typeof defaultCharts]}
                            // onChartData={(data: any) => console.log("Data getting passed into the chart: ", data)}
                        />
                    </Grid>
            ))}
        </QueryWrapper>
    </Grid>
);

export default App;
