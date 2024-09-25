import React from 'react';
import ChartsContainer from 'mf2/ChartsContainer';
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
        <QueryWrapper path={({ openfitnessTables }) => openfitnessTables}>
            {({ data }) => data && Object
                .keys(data.charts)
                .map((chart) => (
                    <Styled.Grid key={chart} size={6}>
                        <ChartsContainer
                            label={`Fitness Tables ${chart}`}
                            charts={data.charts[chart]}
                            defaultChart={defaultCharts[chart]}
                            onChartData={(data) => console.log("Data getting passed into the chart: ", data)}
                        />
                    </Styled.Grid>
            ))}
        </QueryWrapper>
    </Styled.Grid>
);

export default App;
