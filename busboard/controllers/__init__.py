from busboard.controllers.bus_time_controller import bus_controller


def register_controllers(app):
    bus_controller(app)

