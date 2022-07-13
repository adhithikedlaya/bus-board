from flask import request
import requests, os, json
from busboard.model.Bus import Bus, BusInfo, Station

def bus_controller(app):

    api_key = os.getenv("API_KEY")

    @app.route("/next_buses/<stop_code>", methods=['GET'])
    def bus_times(stop_code):

        response = requests.get(f"https://api-nile.tfl.gov.uk/StopPoint/{stop_code}/Arrivals?app_id={api_key}&app_key={api_key}")

        text = response.text
        data = json.loads(text)

        sorted_data = sorted(data, key=lambda item: item['timeToStation'])[:5]


        buses = []
        for bus_data in sorted_data:
            buses.append(Bus.load_bus(bus_data).to_json())

        return { "buses": buses }