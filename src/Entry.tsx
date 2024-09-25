import React from 'react';
// @ts-ignore
import Providers from 'mf2/AppProvider';
import AppRouter from './components/routes/Router';

const Entry = () => {
    return (
        <React.StrictMode>
            <Providers path={({ schema }: { schema: string }) => schema}>
                {(response: any) => response && <AppRouter data={response} />}
            </Providers>
        </React.StrictMode>
    )
}

export default Entry;
