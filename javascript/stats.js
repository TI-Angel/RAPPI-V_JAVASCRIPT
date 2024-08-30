
fetch ('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response =>response.json())
    .then(info => {
        // mayorAsistencia(info);
        // menorAsistencia(info);
        // mayorCapacidad(info);
        console.log(info);
        // eventosFuturos(info);
        // asistenciaEventosFuturos(info);
        // eventosPasados(info);
        // asistenciaEventosPasados(info);
    });

const mayorAsistencia = (datos) => {
    
    let altaAsistencia = [];
        datos.events.forEach(info => {
            if(datos.currentDate >= info.date){
                asistenciaEventos = ((info.assistance * 100) / info.capacity);

                if (asistenciaEventos > 85) {
                    altaAsistencia.push({id: info._id, asistencia: asistenciaEventos});  // Agregar al arreglo si el resultado es mayor a 90%
                }  
            }         
    });
    altaAsistencia = altaAsistencia.sort((a, b) => b.asistencia - a.asistencia).slice(0, 5);

    // Mostramos los resultados en la consola
    altaAsistencia.forEach(res => console.log(`ID: ${res.id}, Asistencia: ${res.asistencia}%`));
   
    return altaAsistencia;
};
const menorAsistencia = (datos) => {
    let bajaAsistencia = [];
    let menorPorcentaje = 100;
        datos.events.forEach(info => {
            if(datos.currentDate >= info.date){
                asistenciaEventos = ((info.assistance * 100) / info.capacity);
                console.log(asistenciaEventos);

                if (asistenciaEventos < 85) {
                    bajaAsistencia.push({id: info._id, asistencia: asistenciaEventos});  // Agregar al arreglo si el resultado es mayor a 90%
                }      
            }         
    });
    bajaAsistencia = bajaAsistencia.sort((a, b) => b.asistencia - a.asistencia).slice(0, 5);

    // Mostramos los resultados en la consola
    bajaAsistencia.forEach(res => console.log(`ID: ${res.id}, Asistencia: ${res.asistencia}%`));
   
    return bajaAsistencia;
};

const mayorCapacidad = (datos) => {
    let resultado = datos.events.sort((a,b) => b.capacity - a.capacity).slice(0,5);
    console.log(resultado);
   
    return resultado;
};

// Estadísticas por categorias de próximos eventos 
const eventosFuturos = (datos) => {

    let categorias = [];
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