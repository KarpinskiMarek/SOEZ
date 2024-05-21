import {request} from "./AuthenticationConfig";

export const getEmails = async () => {
    try {
        const response = await request("GET", "/users");
        const users = response.data;
        return users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }));
    } catch (error) {
        console.error("Error while getting emails", error);
        throw error;
    }
}