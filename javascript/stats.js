
fetch ('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response =>response.json())
    .then(info => {
        mayorAsistencia(info);
        menorAsistencia(info);
        mayorCapacidad(info);
        eventosFuturos(info);
        asistenciaEventosFuturos(info);
        eventosPasados(info);
        asistenciaEventosPasados(info);
    });

const mayorAsistencia = (datos) => {
    let altaAsistencia = [];
        datos.events.forEach(info => {
            if(datos.currentDate >= info.date){
                asistenciaEventos = ((info.assistance * 100) / info.capacity);

                if (asistenciaEventos > 85) {
                    altaAsistencia.push({name: info.name, asistencia: asistenciaEventos});  // Agregar al arreglo si el resultado es mayor a 90%
                }  
            }             
    });
    
    altaAsistencia = altaAsistencia.sort((a, b) => b.asistencia - a.asistencia).slice(0, 5);

    enCeldasPorcentajes(0, altaAsistencia);
    return altaAsistencia;
};
const menorAsistencia = (datos) => {
    let bajaAsistencia = [];
        datos.events.forEach(info => {
            if(datos.currentDate >= info.date){
                asistenciaEventos = ((info.assistance * 100) / info.capacity);

                if (asistenciaEventos < 85) {
                    bajaAsistencia.push({name: info.name, asistencia: asistenciaEventos});  // Agregar al arreglo si el resultado es mayor a 90%
                }      
            }         
    });
    bajaAsistencia = bajaAsistencia.sort((a, b) => b.asistencia - a.asistencia).slice(0, 5);
   
    enCeldasPorcentajes(1, bajaAsistencia);
    return bajaAsistencia;
};

const mayorCapacidad = (datos) => {
    let resultado = datos.events.sort((a,b) => b.capacity - a.capacity).slice(0,5);
    console.log(resultado);
    const celda = document.getElementById('porcentaje');
    // resultado.forEach(evento => {
    //         let fila = document.createElement('tr');
    //         fila.innerHTML = `<td>${evento.name} capacity: ${evento.capacity}</td>`;
    //         tabla.appendChild(fila);
    //     });
    // return resultado;
    let contenidoCelda = '';
    resultado.forEach(evento => {
        contenidoCelda += `${evento.name} capacity: ${evento.capacity}<br>`;
    });

    let fila = document.createElement('tr');
    fila.innerHTML = `<td>${contenidoCelda}</td>`;
    celda.appendChild(fila);
};

// Estadísticas por categorias de próximos eventos 
const eventosFuturos = (datos) => {

    // let categorias = [];
    let ingresosCategoria = [];

    datos.events.forEach(event => {
        let ingresos = event.price * event.estimate;
        let categoria = event.category
        if(datos.currentDate <= event.date){

            if(!ingresosCategoria[categoria]){
                ingresosCategoria[categoria] = ingresos;
            } else {
                ingresosCategoria[categoria] += ingresos;
            }
        }
       

    });

    console.log(ingresosCategoria);
}

const asistenciaEventosFuturos = (datos) => {
    let asistenciaCategoria = [];
    
    datos.events.forEach(event => {
        // let estimado = 0;
        // let capacidad = 0;
        let categoria = event.category
        if(datos.currentDate <= event.date){
            // Inicializar la categoría si no existe
            if(!asistenciaCategoria[categoria]){
                asistenciaCategoria[categoria] = {estimado: 0, capacidad: 0};
            } 
            // Sumar asistencia y capacidad a la categoría correspondiente
            asistenciaCategoria[categoria].estimado += event.estimate || 0;
            asistenciaCategoria[categoria].capacidad += event.capacity || 0;
        }
    });
    // Calcular y mostrar el porcentaje de asistencia por categoría
    for(let categoria in asistenciaCategoria) {
        const capacidad = asistenciaCategoria[categoria].capacidad;
        const estimado = asistenciaCategoria[categoria].estimado;
        const resultado = (estimado * 100) / capacidad;

        console.log(`Categoría: ${categoria}, Porcentaje de asistencia: ${resultado.toFixed(2)}%`);
    }
    // console.log(asistenciaCategoria);
}
// Estadisticas por categorias de eventos pasados 
const eventosPasados = (datos) => {
    let ingresosCategoria = [];
    
    datos.events.forEach(event => {
        let ingresos = event.price * event.assistance;
        let categoria = event.category
        if(datos.currentDate >= event.date){

            if(!ingresosCategoria[categoria]){
                ingresosCategoria[categoria] = ingresos;
            } else {
                ingresosCategoria[categoria] += ingresos;
            }
        }
    });
    console.log(ingresosCategoria);
}

const asistenciaEventosPasados = (datos) => {
    let asistenciaCategoria = [];
    
    datos.events.forEach(event => {
        let categoria = event.category
        if(datos.currentDate >= event.date){
            // Inicializar la categoría si no existe
            if(!asistenciaCategoria[categoria]){
                asistenciaCategoria[categoria] = {asistencia: 0, capacidad: 0};
            } 
            // Sumar asistencia y capacidad a la categoría correspondiente
            asistenciaCategoria[categoria].asistencia += event.assistance || 0;
            asistenciaCategoria[categoria].capacidad += event.capacity || 0;
        }
    });
    // Calcular y mostrar el porcentaje de asistencia por categoría
    for(let categoria in asistenciaCategoria) {
        const capacidad = asistenciaCategoria[categoria].capacidad;
        const asistencia = asistenciaCategoria[categoria].asistencia;
        const resultado = (asistencia * 100) / capacidad;

        console.log(`Categoría: ${categoria}, Porcentaje de asistencia: ${resultado.toFixed(2)}%`);
    }
}

function enCeldasPorcentajes(columnIndex, cellContents) {
    // Obtener la fila
    const row = document.querySelector("#tbody #porcentaje");

    while (row.children.length > columnIndex) {
        row.removeChild(row.children[columnIndex]);
    }

    // Iterar sobre el contenido proporcionado
    cellContents.forEach(evento => {
        // Crear una nueva celda
        const newCell = document.createElement("tr");

        // Agregar contenido a la celda
        newCell.innerHTML = `${evento.name} assistance: ${evento.asistencia.toFixed(2)}%`;

        // Insertar la celda en la columna correspondiente
        if (row.children[columnIndex]) {
            row.children[columnIndex].appendChild(newCell);
        } else {
            // Si no hay una celda en la columna especificada, crear una nueva
            const newColumn = document.createElement("td");
            newColumn.appendChild(newCell);
            row.appendChild(newColumn);
        }
    });
}




