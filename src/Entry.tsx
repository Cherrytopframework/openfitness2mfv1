import React from 'react';
// @ts-ignore
import Providers from 'mf2/AppProvider';
// @ts-ignore
import Logs from 'mf2/utilities/Logs';
import AppRouter from './components/routes/Router';


const logs = new Logs('openfitness:3003', 'background: #222; color: #035a15');
logs.log('This is a message', 'Additional info', 123);

console.logs = logs.log;
// custom.d.ts
declare global {
    interface Console {
        logs: (...args: any[]) => void;
    }
}

const Entry = (frameworkProps: any) => {
    return (
        <React.StrictMode>
            <Providers path={({ schema }: { schema: string }) => schema}>
                {(response: any) => response && <AppRouter data={response} {...frameworkProps} />}
            </Providers>
        </React.StrictMode>
    )
}

export default Entry;
