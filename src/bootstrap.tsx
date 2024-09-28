import { createRoot } from 'react-dom/client';
// @ts-ignore
import NoRemoteEntry from 'mf2/NoRemoteEntry';
// @ts-ignore
import Logs from 'mf2/utilities/Logs';
import App from './Entry';


// export const appLogger = new Logs('openfitness:3003', 'background: #222; color: #000aff');
// // console.log = appLogger.log;


const isDevelopment = (process.env.NODE_ENV === "development");

const root = createRoot(document.getElementById('root')!);
root.render(
    isDevelopment
        ? <App /> 
        : <NoRemoteEntry />
);
