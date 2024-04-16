import {request} from "./AuthenticationConfig";

export const createTrip = async (title, startingDate, endingDate) => {
    try {
        return await request("POST", "/trips/new", {
            title: title,
            startingDate: startingDate,
            endingDate: endingDate
        });
    } catch (error) {
        console.error("Error while creating trip:", error);
        throw error; // Przekażemy błąd dalej, aby mógł być obsłużony w komponencie
    }
}

export const getAllTrips = async () => {
    try {
        const response = await request("GET", "/trips");
        return response.data;
    } catch (error) {
        console.log("Error while fetching trips:", error);
        return [];
    }
}

export const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
}