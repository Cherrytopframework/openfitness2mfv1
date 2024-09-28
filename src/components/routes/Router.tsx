import React from "react";
import { useEffect } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
// mfe components / remote modules
// @ts-ignore
import { useConfirm } from 'mf2/ConfirmProvider';
// @ts-ignore
import { useUtilityStore } from 'mf2/utilities/store/utilityStore';
// @ts-ignore
import { SmoothScroll } from 'mf2/ThemeProvider';
// @ts-ignore
import Navbar from 'mf2/Navbar';
// @ts-ignore
import Planning from 'mf2/Planning';
// local modules
import AppWrapper from '../App/AppWrapper';
import { navbarSchema } from '../config/navbarSchema';


// <NavigationAdapter/> is very similar to the parent <NavigationAdapter/>
// ... that comes from the framework one level up. This one handles routes ...
// ... within this microfrontend. Provides routing within this microfrontend + routes.
const NavigationAdapter = (
    { children, ...props }: 
    { children: JSX.Element, [key: string]: any }
) => {
    const navigate = useNavigate();
    // const { utilityStore } = props?.stores;

    // router.go(): has to be a function referring to the navigate inside of its router context
    const router = { go: (path: string) => navigate(path) };

    console.logs("NavigationAdapter.props: ", props);
    useEffect(() => {
        console.logs("The child navigation has mounted: ", props);
        // This MFE shares navbar functionality with its parent MFE
        if (props?.overrideNavbarSchema) { //this does not exist in standalone mode
            props.overrideNavbarSchema({
                // update the rest of the schema to get the new menu values from the current mfe
                ...navbarSchema({
                    navigate, //this navigate is local to the current mfe context *buggy*
                    router: props.router, // this router should be in the context of the parent mfe
                    utilityStore: props.stores.utilityStore 
                }),
                // left: props.navbarSchema.left, //retain the parent schema to persist the home navigation button
            });
        };
    }, []);

    return (
        <>
            {/* These "providers" have to be inside of the router */}
            {/* This is kind of like a "map-state-to-props" for all the microfrontends */}
            <SmoothScroll>
                {React.cloneElement(children, { ...props, router })}
            </SmoothScroll>
        </>
    );
};

const Test = (props: any) => {
    console.logs("Test.props: ", props);
    return (
        <div style={{ marginTop: "100px" }}>
            <>This {console.logs("Test.props: ", "props")} is the test route</>
        </div>
    )
}

// **Note:
// * Super weird way that is required in order to have child routes inside of a ...
// * ... child mfe. Child route must also be defined a certain way in the parent mfe hosting ...
// * ... the parent <AppRouter />.
function AppRouter(props: any) {
    const utilityStore = useUtilityStore();
    const confirm = useConfirm();

    console.logs("AppRouter.props: ", props);
    const appRoutes = [
        {
            path: "/openfitness",
            element: (
                <AppWrapper 
                    data={props.data} 
                    stores={{ utilityStore, confirm }} 
                />
            )
        },
        // {
        //     path: "/",
        //     element: (
        //         <AppWrapper 
        //             data={props.data} 
        //             stores={{ utilityStore, confirm }} 
        //         />
        //     )
        // },
        {
            path: "/test",
            element: (<Planning />)
        },
        {
            path: "/test2",
            element: (<Test />)
        }
    ].map((route) => ({
        id: route.path,
        ...route,
        element: (
            <NavigationAdapter
                // // utility function comes from parent MFE
                // overrideNavbarSchema={props.overrideNavbarSchema}
                {...props}
                // // pass stores in second to override store to be local store
                // stores={{ utilityStore }}
            >
                {route.element}
            </NavigationAdapter>
        )
    }));
    // .map((route) => ({ 
    //     ...route, 
    //     id: route.path,
    //     element: (
    //         <>
    //             <Navbar 
    //                 layout={navbarSchema({ utilityStore })} 
    //                 stores={{ utilityStore, confirm }}
    //             />
    //             {route.element}
    //             <BottomNavigation 
    //                 items={["Weight", "Food", "Exercise", "Sleep", "Steps"]} 
    //                 onClick={(item) => utilityStore.setDrawer({ 
    //                     open: true, 
    //                     anchor: "bottom",
    //                     onOpen: () => {},
    //                     boxStyle: { width: "100%" },
    //                     content: ["Food", "Exercise"].includes(item) 
    //                         ? (
    //                             <>
    //                                 <Tabs 
    //                                     tabs={[
    //                                         {
    //                                             value: "recents",
    //                                             label: "Recents"
    //                                         },
    //                                         {
    //                                             value: "favorites",
    //                                             label: "Favorites"
    //                                         },
    //                                         {
    //                                             value: "search",
    //                                             label: "Search"
    //                                         },
    //                                     ]}
    //                                     onChange={(value: string) => console.logs("The search tab changed: ", value)}
    //                                     renderContent={(value: string) => (
    //                                         <div>
    //                                             <pre>
    //                                                 {value}
    //                                                 {JSON.stringify(value, null, 2)}
    //                                             </pre>
    //                                         </div>
    //                                     )}
    //                                 />
    //                                 <ChatBox 
    //                                     handleSend={(send: any) => {
    //                                         console.logs("send Callback from host app: ", send)
    //                                         utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) });
    //                                         setTimeout(() => utilityStore.setDrawer({ 
    //                                             open: true, 
    //                                             anchor: "right",
    //                                             boxStyle: { width: "40vw" },
    //                                             content: (
    //                                                 <FormContainer
    //                                                     schema={data.find(({ table }) => (table === item.toLowerCase()))}
    //                                                     onSubmit={(submission) => {
    //                                                         console.logs(
    //                                                             "BottomNavigation.QueryWrapper.FormContainer.SUBMISSION: ", 
    //                                                             submission
    //                                                         );
    //                                                         utilityStore.setDrawer({ open: false, anchor: "right", content: (<></>) });
    //                                                     }}
    //                                                     onCancelClick={() => utilityStore.setDrawer({ open: false, anchor: "right", content: (<></>) })}
    //                                                 />
    //                                             )
    //                                         }), 500); // wait for the first drawer to close
    //                                     }}
    //                                 />
    //                             </>
    //                         ) : (
    //                             <FormContainer
    //                                 schema={data.find(({ table }) => (table === item.toLowerCase()))}
    //                                 onSubmit={(submission) => {
    //                                     console.logs(
    //                                         "BottomNavigation.QueryWrapper.FormContainer.SUBMISSION: ", 
    //                                         submission
    //                                     );
    //                                     utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) });
    //                                 }}
    //                                 onCancelClick={() => utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) })}
    //                             />
    //                         )
    //                 })} 
    //             />
    //         </>
    //     )
    // }));

    const appRouter = createBrowserRouter(appRoutes);

    return <RouterProvider router={appRouter} />;
};

export default AppRouter;
