export function mostrarEventos(listaEventos) {
    let container = document.getElementById("contenedor");
    container.innerHTML = "";
  
    listaEventos.forEach((evento) => {
      const nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.className = "col-12 col-sm-5 col-md-4 col-lg-3 card p-0"
      nuevaTarjeta.innerHTML = `
        <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <div class="card-bottom d-flex justify-content-between">
          <p>Price: $${evento.price}</p>
          <a href="./pages/detail.html?id=${evento._id}" class="btn btn-primary">Details</a>
        </div>
      </div>`;
    container.appendChild(nuevaTarjeta);
    });
};

export const generarCheck = (data) => {
    let contaierCheckbox = document.getElementById('checkbox');
    let categorias = [];
    
    data.forEach(event => {
      if(!categorias.includes(event.category)){
        categorias.push(event.category);
      }
    });
    console.log(categorias);
    
    for (let i=0; i < categorias.length; i++){
      let checkbox = document.createElement('div');
      checkbox.className = 'form-check form-check-inline';
      checkbox.innerHTML = `
      <input class="form-check-input" type="checkbox" id="checkbox" value="${categorias[i]}">
      <label class="form-check-label" for="checkbox">${categorias[i]}</label>`
    
      contaierCheckbox.appendChild(checkbox);
    }
};

let mensajeNoEncontrado = document.getElementById("noResultado");
let buscarInput = document.getElementById("buscar");

// export const filtroBuscador = (data) => {
//     buscarInput.addEventListener("input", () => {
//         let buscarEventos = buscarInput.value.toLowerCase();
//         let filtrarEventos = data.filter((evento) => 
//             evento.name.toLocaleLowerCase().includes(buscarEventos));
        
//         if(filtrarEventos.length === 0){
//           mensajeNoEncontrado.style.display = "block";
//         }
//         else {
//         mensajeNoEncontrado.style.display = "none";
//         }
//       mostrarEventos(filtrarEventos);
//     });
// };

// export const filtroCheck = (data) => {

//     document.getElementById("checkbox").addEventListener('change',(e)=>{
//       let chekeado = document.querySelectorAll('input[type=checkbox]:checked');
//       let eventosChekeados = Array.from(chekeado).map(checkbox => checkbox.value);
//       console.log(eventosChekeados);
      
//       let filtrarEventosCheckbox = data.events.filter(events => 
//         eventosChekeados.length === 0 ||  eventosChekeados.includes(events.category));
//       mostrarEventos(filtrarEventosCheckbox);
//     });
// };

export const busquedaEventos = (data) => {
    const filtrarEventos = () => {
        const buscarEventos = buscarInput.value.toLowerCase();
        const chekeado = document.querySelectorAll('input[type=checkbox]:checked');
        const eventosChekeados = Array.from(chekeado).map(checkbox => checkbox.value);

        let eventosFiltrados = data.filter(evento => {
            const coincideBusqueda = evento.name.toLowerCase().includes(buscarEventos);
            const coincideCheckbox = eventosChekeados.length === 0 || eventosChekeados.includes(evento.category);
            return coincideBusqueda && coincideCheckbox;
        });

        if (eventosFiltrados.length === 0) {
            mensajeNoEncontrado.style.display = "block";
        } else {
            mensajeNoEncontrado.style.display = "none";
        }

        mostrarEventos(eventosFiltrados);
    };

    buscarInput.addEventListener("input", filtrarEventos);
    document.getElementById("checkbox").addEventListener('change', filtrarEventos);
};