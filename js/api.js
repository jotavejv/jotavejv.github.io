const API = "https://api.npoint.io/ddccb0fb1986eed44828";
export function getApi(data) {
    return fetch(`${API}/${data}`)
        .then(response => response.json())
};