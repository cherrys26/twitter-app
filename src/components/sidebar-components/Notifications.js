import React from 'react';
import Header from './Toolbar';

import { TabView, TabPanel } from 'primereact/tabview'

export default function Notifications() {
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <Header />
            </div>
            <div className="p-col-7">
                <TabView>
                    <TabPanel header="All">
                        <ul>
                            <li>
                                Hello World
                        </li>
                            <li>
                                Hello World
                        </li>
                            <li>
                                Hello World
                        </li>
                        </ul>
                    </TabPanel>
                    <TabPanel header="Mentions">
                        <ul>
                            <li>
                                Hello World
                        </li>
                            <li>
                                Hello World
                        </li>
                            <li>
                                Hello World
                        </li>
                        </ul>
                    </TabPanel>
                </TabView>
            </div>
            <div className="p-col-5">
                Testing
            </div>
        </div>
    )
}