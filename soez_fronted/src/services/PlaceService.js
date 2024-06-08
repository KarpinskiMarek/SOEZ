import { request } from "./Authconfig";

export const addPlace = async (tripId, name, arrive, leave, country) => {
    try {
        return await request("POST", `/trips/places/${tripId}/new`, {
            name: name,
            arrive: arrive,
            leave: leave,
            country: country
        }, {}, {});
    } catch (error) {
        console.error("Error while adding place");
    }
};

export const getTripPlaces = async (tripId) => {
    try {
        const response = await request("GET", `/trips/${tripId}`);
        return response.data.places;
    } catch (error) {
        console.error("Error while getting places", error);
    }
};

export const deletePlace = async (tripId, placeId) => {
    try {
        return await request("DELETE", `/trips/${tripId}/places/delete/${placeId}`);
    } catch (error) {
        console.error("Error while deleting place", error);
    }
}