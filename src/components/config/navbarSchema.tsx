// @ts-ignore
import NavMenu from 'mf2/NavMenu';

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        console.error("ErrorBoundary caught an error:", error);
        // Update state to indicate an error has occurred
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if ((this.state as any).hasError) {
            // Fallback UI when an error is caught
            return (
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please try again later.</p>
                </div>
            );
        }

        return (this.props as any).children;
    }
}

export default ErrorBoundary;

// ** navbarSchema -- This will determine the structure/layout of the navbar
// ** Note: it does not have to be a function. It just needs to return an object
// ** ... with the same structure.
// ... icon driven: https://mui.com/material-ui/material-icons/
// ... drawer | menu | home | cart | title
// ... items will display in the order specified in array
// ... drawer | menu | cart => also take an anchor prop and a content prop that will 
// ... display in the drawer and determine drawers position
// ... cart is linked to its own store that can be accessed anywhere in the app
// ... cart drawer will use the state in the cart store to render its view
export const navbarSchema = ({ utilityStore, router }: any) => ({
    left: { 
        items: [
            {
                key: "home",
                onClick: () => router.go("/")
            }
        ]
    },
    middle: {
        items: [
            {
                key: "title",
                content: "Openfitness2.1 mfv 0.0.1 copyright 2024 ❤️ Micha3l Woodward",
            },
        ]
    },
    right: {
        items: [
            {
                key: "menu",
                anchor: "right",
                content: (
                    <ErrorBoundary>
                        <NavMenu
                            items={[
                                {
                                    key: "home",
                                    onClick: () => {
                                        console.log("home clicked: ", router);
                                        router.go("/")
                                        // navigate("/test");
                                    }
                                },
                                {
                                    key: "alert",
                                    onClick: () => utilityStore.createAlert("info", "test alert")
                                },
                                // ...etc. ...
                            ]}
                        />
                    </ErrorBoundary>
                )
            },
        ]
    },
});
