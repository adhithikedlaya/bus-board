import requests, os, json

api_key = os.getenv("API_KEY")

class Bus:

    def __init__(self, bus_id, bus_info, time_to_station):
        self.bus_id = bus_id
        self.bus_info = bus_info
        self.time_to_station = time_to_station

    def to_json(self):
        return {
            "bus_id": self.bus_id,
            "bus_info": self.bus_info.to_json(),
            "time_to_station": self.time_to_station
        }


    @staticmethod
    def load_bus(bus_data):
        bus_info = BusInfo.load_info(bus_data['platformName'], bus_data['lineId'], bus_data['direction'])
        return Bus(bus_data['id'], bus_info, bus_data['timeToStation'])


class BusInfo:

    def __init__(self, line_id, direction, stations):
        self.line_id = line_id
        self.direction = direction
        self.stations = stations

    @staticmethod
    def load_info(current_station_name, line_id, direction):
        response = requests.get(
            f"https://api-nile.tfl.gov.uk/Line/{line_id}/Route/Sequence/{direction}?serviceTypes=Regular&excludeCrowding=true&app_id={api_key}&app_key={api_key}")
        text = response.text
        data = json.loads(text)
        station_data = data['stations']
        stations = []
        should_append = False
        for raw_station in station_data:
            station = Station.load_station(raw_station)
            if should_append:
                stations.append(station)
            else:
                if station.name == current_station_name:
                    should_append = True

        return BusInfo(line_id, direction, stations)

    def to_json(self):
        stations = [station.to_json() for station in self.stations]
        return {
            "line_id": self.line_id,
            "direction": self.direction,
            "stations": stations
        }

class Station:
    def __init__(self, name):
        self.name = name

    @staticmethod
    def load_station(station):
        return Station(station['name'])

    def to_json(self):
        return {
            "name": self.name
        }