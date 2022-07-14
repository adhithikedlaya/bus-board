import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React from "react";
import "./RouteComponent.css";

export default function RouteComponent(props) {
    let route = props.route
    return (
        <div>
            <ul className="route-expansion">
                {route.map((stop, i) => {

                    let delay = (i * 0.025) + "s"
                    return (
                        <div className="route-animation" style={{ animationDelay: delay }}>
                            <div className={i % 2 === 0 ? "route-background-one" : "route-background-two"} >
                                <div className="route-item-container">
                                    <li className="route-stop">Stop: {stop.name}</li>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}