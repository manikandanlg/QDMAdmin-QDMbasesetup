import React from "react";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import AdminMenu from './AdminMenu'; 



function Verticaltab() {
    return (
        <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
            <TabList>
                <Tab tabFor="vertical-tab-one">Management</Tab>
                <Tab tabFor="vertical-tab-two">Report</Tab>                
            </TabList>

            <TabPanel tabId="vertical-tab-one">
               <AdminMenu/> 
            </TabPanel>

            <TabPanel tabId="vertical-tab-two">
                <p>Tab content</p>
            </TabPanel>

          
        </Tabs>
    );
}

export default Verticaltab;

