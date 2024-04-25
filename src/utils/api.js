import { shortISO } from "./date-wrangler";

export default function getData(url) {
    return fetch(url).then((resp) => {
        if (!resp.ok) {
            throw new Error("Failed to fetch data");
        }
        return resp.json();
    }).catch(error => {
        console.error(error);
        throw new Error("Failed to fetch data");
    });
}

export function getBookings(bookableId, startDate, endDate) {
    const start = shortISO(startDate);
    const end = shortISO(endDate);
    const urlRoot = "http://localhost:3001/bookings";
    const query = `bookableId=${bookableId}`;
    return getData(`${urlRoot}?${query}`);
}
