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