from flask import request
import requests, os, json
from busboard.model.Bus import Bus, BusInfo, Station



def bus_controller(app):
    @app.route("/next_buses", methods=['GET'])
    def bus_times():
        data = request.get_json()

        if 'stop_code' in data:
            stop_code = data['stop_code']
            buses = get_buses(stop_code)
        elif 'postcode' in data:
            postcode = data['postcode']
            radius = data['radius'] if 'radius' in data else 200
            bus_stops = get_bus_stops(postcode, radius)
            buses = []
            for stop in bus_stops:
                stop_buses = get_buses(stop['stop_point'])
                for bus in stop_buses:
                    buses.append(bus)

        return {"buses": [{'queried_stop': bus[0], 'bus': bus[1].to_json()} for bus in buses]}

def get_buses(stop_code):
    api_key = os.getenv("API_KEY")
    response = requests.get(
        f"https://api-nile.tfl.gov.uk/StopPoint/{stop_code}/Arrivals?app_id={api_key}&app_key={api_key}")

    text = response.text
    data = json.loads(text)

    sorted_data = sorted(data, key=lambda item: item['timeToStation'])[:5]

    buses = []
    for bus_data in sorted_data:
        buses.append((bus_data['stationName'], Bus.load_bus(bus_data)))

    return buses


def get_bus_stops(postcode, radius):
    long, lat = get_coordinates(postcode)
    response = requests.get(
        f"https://api-nile.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius={radius}&useStopPointHierarchy=false&modes=bus&categories=none&returnLines=false&lat={lat}&lon={long}")
    text = response.text
    data = json.loads(text)
    closest_two = data['stopPoints'][:2]
    closest_stops = [{'stop_point': point['id'], 'distance': point['distance'], 'name': point['commonName']} for point in closest_two]

    return closest_stops


def get_coordinates(postcode):
    response = requests.get(f"https://api.postcodes.io/postcodes/{postcode}")

    text = response.text
    data = json.loads(text)

    long = data['result']['longitude']
    lat = data['result']['latitude']

    return long, lat
