import React from 'react';
// import Providers from 'app/AppProvider';
import AppRouter from './components/routes/Router';

// import AppWrapper from './components/App/AppWrapper';

const Entry = () => {
    return (
        <React.StrictMode>
            <AppRouter />
            {/* <Providers path={false}>
                {() => <AppRouter/>}
                {(response) => response && <AppWrapper data={response} />}
            </Providers> */}
        </React.StrictMode>
    )
}

export default Entry