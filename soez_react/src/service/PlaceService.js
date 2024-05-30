import {request} from "./AuthenticationConfig";

export const addPlace = async (tripId, name, arrive, leave, ticket, country) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('arrive', arrive);
        formData.append('leave', leave);
        formData.append('ticketFile', ticket);
        formData.append('country', country);

        return await request("POST", `trips/places/${tripId}/new`, formData, {
            'Content-Type': 'multipart/form-data'
        });

    } catch (error) {
        console.error("Error while adding place:", error)
        throw error;
    }
}

export const getTripPlaces = async (tripId) => {
    try {
        const response = await request("GET", `/trips/${tripId}`, {}, {});
        return response.data.places;
    } catch (error) {
        console.log("Error while fetching places:", error);
        return null;
    }
}

export const getPlace = async (placeId) => {
    try {
        const response = await request("GET", `/places/${placeId}`, {}, {})
        return response.data;
    } catch (error) {
        console.log("Error while fetching place", error);
        return null;
    }
}