import { mostrarEventos, generarCheck, busquedaEventos } from "../modules/functions.js";
fetch ('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(info => {
    const currentDate = new Date(info.currentDate);

    const eventosFiltrados = info.events.filter(event => new Date(event.date) <= currentDate);
    mostrarEventos(eventosFiltrados);
    generarCheck(eventosFiltrados);
    busquedaEventos(info.events);
    
  });