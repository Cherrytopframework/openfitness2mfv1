import React from 'react';
import NavMenu from 'mf2/NavMenu';


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
export const navbarSchema = ({ utilityStore, navigate }) => ({
    left: {
        items: [
            {
                key: "drawer",
                anchor: "left",
                content: (<>Drawer Content</>),
                onClick: () => utilityStore.setDrawer({ 
                    open: true, 
                    anchor: "left",
                    onOpen: () => {},
                    content: <></>
                }),
                // can override default props
                buttonProps: { tooltip: "LEFT DRAWR" }
            },
            {
                key: "home",
                onClick: () => navigate("/")
            },
        ]
    },
    middle: {
        items: [
            {
                key: "title",
                content: "Openfitness2.1.mfe version",
            },
        ]
    },
    right: {
        items: [
            {
                key: "drawer",
                anchor: "right",
                content: (<>Drawer Content</>),
                onClick: () => utilityStore.setDrawer({ 
                    open: true, 
                    anchor: "left",
                    onOpen: () => {},
                    content: (
                        <>Drawer Content LOCAL</>
                    )
                })
            },
            {
                key: "cart",
                anchor: "right",
                content: (<>Drawer Content</>),
                onClick: () => utilityStore.setDrawer({ 
                    open: true, 
                    anchor: "right",
                    onOpen: () => {},
                    content: <></>
                })
            },
            {
                key: "menu",
                anchor: "right",
                content: (<NavMenu />)
            },
        ]
    },
});