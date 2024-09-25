// @ts-ignore
import ChartsContainer from 'mf2/ChartsContainer';
// @ts-ignore
import QueryWrapper from 'mf2/QueryWrapper';
import { Styled } from './App.styles';

const defaultCharts = {
    weight: "line",
    food: "bar",
    exercise: "bar",
    steps: "line",
    sleep: "bar",
};

const App = (
    // // destructure the store needed to render less code
    // { stores: { utilityStore } }:
    // { stores?: any },
) => (
    <Styled.Grid container>
        {/* {console.log("App.props: ", utilityStore) as any} */}
        <Styled.Grid>
            Openfitness2.1.mfe
        </Styled.Grid>
        <QueryWrapper path={({ openfitnessTables }: { openfitnessTables: string }) => openfitnessTables}>
            {({ data }: { data: any }) => data && Object
                .keys(data.charts)
                .map((chart) => (
                    <Styled.Grid key={chart} size={6}>
                        <ChartsContainer
                            label={`Fitness Tables ${chart}`}
                            charts={data.charts[chart]}
                            defaultChart={defaultCharts[chart as keyof typeof defaultCharts]}
                            onChartData={(data: any) => console.log("Data getting passed into the chart: ", data)}
                        />
                    </Styled.Grid>
            ))}
        </QueryWrapper>
    </Styled.Grid>
);

export default App;
