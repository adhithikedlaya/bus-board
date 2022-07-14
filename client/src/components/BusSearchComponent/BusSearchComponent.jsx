import React, { useState } from "react";
import { ApiService } from "../../ApiService";
import BusComponent from "../BusComponent/BusComponent";
import "./BusSearchComponent.css";

export function BusSearchComponent(props) {
    const apiService = new ApiService();
    const [buses, setBuses] = useState([]);

    let submitBusCode = (event) => {
        event.preventDefault();
        if (props.type === "stopcode") {
            apiService.queryFromStopCode(event.target.stopcode.value).then((response) => {
                setBuses(response.data);
            });
        } else if (props.type === "postcode") {
            apiService.queryFromPostCode(event.target.postcode.value, 200).then((response) => {
                setBuses(response.data);
            });
        }
    }

    return (
        <div>
            <form onSubmit={submitBusCode}>
                <div className="input-form">
                    {props.type === "stopcode" &&
                        <input type="text" placeholder="Stop Code" id="stopcode" />
                    }

                    {props.type === "postcode" &&
                        <div>
                            <input type="text" placeholder="Postcode" id="postcode" />
                            <br />
                            <input type="text" placeholder="Radius" id="radius" />
                        </div>
                    }

                    <input type="submit" />
                </div>

            </form>
            <h1>Your next buses are: </h1>
            {buses.length !== 0 &&
                <ul className="buslist">
                    {buses.map((bus_data, i) => {
                        return <BusComponent bus_data={bus_data} index={i} />
                    })}
                </ul>
            }
        </div>
    );
}