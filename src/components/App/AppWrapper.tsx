
// mfe components / remote modules
// @ts-ignore
import BottomNavigation from 'mf2/BottomNavigation';
// @ts-ignore
import FormContainer from 'mf2/FormContainer';
// @ts-ignore
import ChatBox from 'mf2/ChatBox';
// @ts-ignore
import Tabs from 'mf2/Tabs';
// @ts-ignore
import { useUtilityStore } from 'mf2/utilities/store/utilityStore';
// local modules
import App from './App';


const AppWrapper = ({ stores, data }: { stores?: any, data?: any }) => {
    const { utilityStore } = stores;
    console.log("AppWrapper.stores: ", stores);
    return (
        <>
            <App />
            <BottomNavigation 
                items={["Weight", "Food", "Exercise", "Sleep", "Steps"]} 
                onClick={(item: string) => utilityStore.setDrawer({ 
                    open: true, 
                    anchor: "bottom",
                    onOpen: () => {},
                    boxStyle: { width: "100%" },
                    content: ["Food", "Exercise"].includes(item) 
                        ? (
                            <>
                                <Tabs 
                                    tabs={[
                                        {
                                            value: "recents",
                                            label: "Recents"
                                        },
                                        {
                                            value: "favorites",
                                            label: "Favorites"
                                        },
                                        {
                                            value: "search",
                                            label: "Search"
                                        },
                                    ]}
                                    onChange={(value: string) => console.log("The search tab changed: ", value)}
                                    renderContent={(value: string) => (
                                        <div>
                                            <pre>
                                                {value}
                                                {JSON.stringify(value, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                />
                                <ChatBox 
                                    handleSend={(send: any) => {
                                        console.log("send Callback from host app: ", send)
                                        utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) });
                                        setTimeout(() => utilityStore.setDrawer({ 
                                            open: true, 
                                            anchor: "right",
                                            boxStyle: { width: "40vw" },
                                            content: (
                                                <FormContainer
                                                    schema={data.find(({ table }: { table: string }) => (table === item.toLowerCase()))}
                                                    onSubmit={(submission: any) => {
                                                        console.log(
                                                            "BottomNavigation.QueryWrapper.FormContainer.SUBMISSION: ", 
                                                            submission
                                                        );
                                                        utilityStore.setDrawer({ open: false, anchor: "right", content: (<></>) });
                                                    }}
                                                    onCancelClick={() => utilityStore.setDrawer({ open: false, anchor: "right", content: (<></>) })}
                                                />
                                            )
                                        }), 500); // wait for the first drawer to close
                                    }}
                                />
                            </>
                        ) : (
                            <FormContainer
                                schema={data.find(({ table }: { table: string }) => (table === item.toLowerCase()))}
                                onSubmit={(submission: any) => {
                                    console.log(
                                        "BottomNavigation.QueryWrapper.FormContainer.SUBMISSION: ", 
                                        submission,
                                        stores
                                    );
                                    utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) });
                                }}
                                onCancelClick={() => utilityStore.setDrawer({ open: false, anchor: "bottom", content: (<></>) })}
                            />
                        )
                })} 
            />
        </>
    )
}

export default AppWrapper