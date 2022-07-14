export class ApiService {

    queryFromStopCode(stopCode) {
        return new Promise((resolve, reject) =>
            fetch("/next_buses?stop_code=" + stopCode, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
                .then((response) => checkResponse(response))
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        );
    }

    queryFromPostCode(postCode, radius) {
        return new Promise((resolve, reject) =>
        fetch("/next_buses?postcode=" + postCode + "&radius=" + radius, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then((response) => checkResponse(response))
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    );
    }

}

const checkResponse = async (response) => {
    if (response.ok) {
        return response;
    }

    let json = await response.json();
    throw new Error(json.error);
};