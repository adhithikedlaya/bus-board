import React, { useState } from "react";
import "./RouteComponent.css";

export default function RouteComponent(props) {
    let route = props.route
    console.log(route)


    return (
        <div>
            <ul>
                {route.map((stop, i) => {
                    return <p>{stop.name}</p>
                })}
            </ul>
        </div>
    );
}