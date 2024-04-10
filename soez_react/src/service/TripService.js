import {request, setAuthHeader} from "./AuthenticationService";

export const createTrip = (title, startingDate, endingDate) => {
    request(
        "POST",
        "/trips/new",
        {
            title: title,
            startingDate: startingDate,
            endingDate: endingDate
        }).then(
        (response) => {
            console.log(response)
        }).catch(
                (error) => {
                console.log(error);
            });
}