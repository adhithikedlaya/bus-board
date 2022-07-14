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

    let inputPadding = buses.length === 0 ? "2em" : "0em";
    let message = props.type === "postcode" ? "buses near you" : "buses for your stopcode";

    return (
        <div>
            <form onSubmit={submitBusCode}>
                <div className="input-form" style={{paddingBottom: inputPadding}}>
                    {props.type === "stopcode" &&
                        <input type="text" placeholder="stop code" id="stopcode" className="input-form-box" />
                    }

                    {props.type === "postcode" &&
                        <div>
                            <input type="text" placeholder="postcode" id="postcode"  className="input-form-box" />
                            <br />
                            <input type="text" placeholder="radius (m)" id="radius"  className="input-form-box" />
                        </div>
                    }

                    <input className="submit-button" type="submit" value="submit"/>
                </div>

            </form>

    
            
            {buses.length !== 0 && <div>
                <p className="next-buses">{message}</p>
                <ul className="buslist">
                    {buses.map((bus_data, i) => {
                        return <BusComponent bus_data={bus_data} index={i} />
                    })}
                </ul></div>
            }
        </div>
    );
}