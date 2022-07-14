from flask import request
import requests, os, json
from busboard.model.Bus import Bus, BusInfo, Station



def bus_controller(app):
    @app.route("/next_buses", methods=['GET'])
    def bus_times():
        if 'stop_code' in request.args:
            stop_code = request.args.get('stop_code')
            buses = get_buses(stop_code)
        elif 'postcode' in request.args:
            postcode = request.args.get('postcode')
            radius = request.args.get('radius') if 'radius' in request.args else 200
            bus_stops = get_bus_stops(postcode, radius)
            buses = []
            for stop in bus_stops:
                stop_buses = get_buses(stop)
                for bus in stop_buses:
                    buses.append(bus)

        bus_data = [{'queried_stop': bus[0], 'bus': bus[1].to_json()} for bus in buses]
        sorted_bus_data = sorted(bus_data, key=lambda item: item['bus']['time_to_station'])
        return {"data": sorted_bus_data}

def get_buses(stop):
    api_key = os.getenv("API_KEY")

    if type(stop) == str:
        response = requests.get(
            f"https://api.tfl.gov.uk/StopPoint/{stop}/Arrivals")
    else:
        response = requests.get(
            f"https://api.tfl.gov.uk/StopPoint/{stop['stop_point']}/Arrivals")



    text = response.text
    data = json.loads(text)
    sorted_data = sorted(data, key=lambda item: item['timeToStation'])[:5]

    buses = []
    for bus_data in sorted_data:
        buses.append((bus_data['stationName'], Bus.load_bus(None if type(stop) == str else stop['indicator'], bus_data)))

    return buses


def get_bus_stops(postcode, radius):
    long, lat = get_coordinates(postcode)
    response = requests.get(
        f"https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius={radius}&useStopPointHierarchy=false&modes=bus&categories=none&returnLines=false&lat={lat}&lon={long}")
    text = response.text
    data = json.loads(text)
    closest_two = data['stopPoints'][:2]
    closest_stops = [{'stop_point': point['id'], 'distance': point['distance'], 'name': point['commonName'], 'indicator': point['indicator']} for point in closest_two]

    return closest_stops


def get_coordinates(postcode):
    response = requests.get(f"https://api.postcodes.io/postcodes/{postcode}")

    text = response.text
    data = json.loads(text)

    long = data['result']['longitude']
    lat = data['result']['latitude']

    return long, lat
