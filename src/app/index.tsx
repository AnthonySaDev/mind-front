


import styles from "./styles.module.css";
import MenuGlobal from "../componets/globals/menus/menu";

import {
    BrowserRouter,
    Route,
    Routes,
    redirect,
    useLocation,
    useNavigate, 
} from "react-router-dom";

import Dashboard from "../app/dashboard";
import IndicatorsStrategic from "../app/strategic/indicators";
import CashFlow from "./financial/cashFlow/page";
import Positions from "./people/positions";
import Financial from "./financial/page";
import Dre from "./financial/dre/page";


// strategic
import Strategic from "./strategic/page";

import Chart from "./strategic/chart/page";
import ChartOpen from "./strategic/chart/open";

import Canvas from "../app/strategic/canvas";
import CanvasOpen from "../app/strategic/canvas/open";

import CulturalCodeStrategic from "../app/strategic/culturalCode";

import TimelineStategic from "../app/strategic/timeline";
import TimelineOpen from "../app/strategic/timeline/open";

import ActionPlan from "./strategic/actionPlan";
import ActionPlanOpen from "./strategic/actionPlan/open";

import Shortly from "./strategic/shortly";
import Peoples from "./people/page";
import Login from "./login/page";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Cookies from "js-cookie";

import CulturalCode_Code from "./strategic/culturalCode/open";
import KanbanBoard from "./strategic/timeline/kanbanBoard";
import Useful_Page from "./documents/useful/page";

  
export default function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!Cookies.get("token-user")) {
            navigate("/login");
        }
    }, [])

    return (
        <div className={[styles.container].join(" ")}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>

            { location.pathname !== "/login/" && Cookies.get("token-user") &&
                <div className={[styles.app].join(" ")}> 
                    <MenuGlobal/>

                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>

                        {/* strategic */}
                        <Route path="/strategic" element={<Strategic/>}/>
                        <Route path="/strategic/indicators" element={<IndicatorsStrategic/>}/>
                        
                        <Route path="/strategic/chart" element={<Chart/>}/>
                        <Route path="/strategic/chart/open/:id" element={<ChartOpen/>}/>
                        
                        <Route path="/strategic/canvas" element={<Canvas/>}/>
                        <Route path="/strategic/canvas/open/:id" element={<CanvasOpen/>}/>

                        <Route path="/strategic/culturalCode" element={<CulturalCodeStrategic/>}/>
                        <Route path="/strategic/culturalCode/open/:id" element={<CulturalCode_Code/>}/>

                        <Route path="/strategic/timeline" element={<TimelineStategic/>}/>
                        <Route path="/strategic/timeline/calendar/open/:id" element={<TimelineOpen/>}/>
                        <Route path="/strategic/timeline/kanbanBoard/open/:date/:id" element={<KanbanBoard/>}/>
                        
                        <Route path="/strategic/actionPlan" element={<ActionPlan/>}/>
                        <Route path="/strategic/actionPlan/open/:id" element={<ActionPlanOpen/>}/>

                        <Route path="/strategic/Shortly" element={<Shortly/>}/>
                        
                        {/* financial */}
                        <Route path="/financial" element={<Financial/>}/>
                        <Route path="/financial/cashFlow" element={<CashFlow/>}/>
                        <Route path="/financial/dre" element={<Dre/>}/>

                        <Route path="/people" element={<Peoples/>}/>
                        <Route path="/people/positions" element={<Positions/>}/>
                        
                        <Route path="/documents/useful" element={<Useful_Page/>}/>
                    </Routes>
                </div>
            }
        </div>
    );
}


