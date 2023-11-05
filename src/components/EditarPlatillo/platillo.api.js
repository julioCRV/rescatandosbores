import axios  from "axios"

const platillosApi = axios.create({
    baseURL: "http://18.116.106.247:3000", //Ruta que debe ser cambiada
});

export const updatePlatillo = (id,platillo) => platillosApi.put(`/modificarPlatillo/${id}`,platillo);

export const getPlatillo = (id) => platillosApi.get(`/mostrarPlatillos/page/${id}`);
