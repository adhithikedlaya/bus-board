import React, { useState } from "react";
import "./BusComponent.css";
import RouteComponent from "../RouteComponent/RouteComponent";

export default function BusComponent(props) {
    const [expandedRoute, setExpandedRoute] = useState(false);

    function busClicked(event) {
        setExpandedRoute(!expandedRoute)
    }

    let bus_data = props.bus_data;
    let bus = bus_data.bus;
    let bus_info = bus.bus_info;
    let time_to_station = Math.round(bus.time_to_station / 60);

    let time_display = "due in " + time_to_station + " minutes"
    if (time_to_station === 0) {
        time_display = "due now";
    }


    return (
        <div className="busdata">
            <div className={props.index % 2 === 0 ? "bus-background-one" : "bus-background-two"}>
                <div className="itemcontainer">
                    <li className="busitem">Number {bus_info.line_id} arriving at {bus_data.queried_stop} {time_display}</li>
                    <img className={expandedRoute ? "expand-arrow rotated" : "expand-arrow"} src="arrow.svg" width="24" height="24" onClick={busClicked}></img>
                </div>
            </div>
            {expandedRoute && <RouteComponent route={bus_info.stations} />}
        </div>
    );
}

