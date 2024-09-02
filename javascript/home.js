import { mostrarEventos, generarCheck, busquedaEventos } from "../modules/functions.js";
fetch ('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response =>response.json())
    .then(info => {
        mostrarEventos(info.events);
        busquedaEventos(info.events);
        generarCheck(info.events);
        console.log(info);
    });

