import React from "react"
import {
    Tabs,
    TabList,
    Tab,
    TabPanel
} from "react-tabs"
import { BusSearchComponent } from "../BusSearchComponent/BusSearchComponent";

import {
    HomeTitleTag,
    HomeTitleContainer,
    HomeSubTitleTag,
    HomeSubTitleContainer
} from "./HomeComponents";
import "./HomePage.css"

export function HomePage(props) {
    return (
        <div>
            <HomeTitleContainer>
                <br />
                <HomeTitleTag>bus board</HomeTitleTag>
                <br />
                <HomeSubTitleContainer>
                    <HomeSubTitleTag>helping you plan your journey 🚌</HomeSubTitleTag>
                </HomeSubTitleContainer>
            </HomeTitleContainer>

            <Tabs>
                <TabList>
                    <Tab>Stop Code</Tab>
                    <Tab>Postcode</Tab>
                </TabList>

                <TabPanel>
                    <BusSearchComponent type="stopcode"/>
                </TabPanel>
                <TabPanel>
                    <BusSearchComponent type="postcode"/>
                </TabPanel>
            </Tabs>
        </div>
    );
}