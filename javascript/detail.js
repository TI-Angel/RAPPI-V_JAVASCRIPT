let urlObjeto = new URLSearchParams(window.location.search);
console.log(urlObjeto);
let eventId = urlObjeto.get('id');

fetch ('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(info => { 
    let detail = info.events.find(e => e._id == eventId);
    console.log(detail);
    let eventDetails = document.getElementById('container-detail');
    if(eventDetails){
        eventDetails.innerHTML = '';
        eventDetails.innerHTML = `
            <div class="card d-flex aling-self-center custom-card-detail">
            <div class="row g-0">
              <div class="col-md-5">
                <img src="${detail.image}" class="img-fluid rounded-start custom-img-detail" alt="${detail.image}">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${detail.name}</h5>
                  <p class="card-text">${detail.description}</p>
                  <p class="card-text"><b>Date: </b>${detail.date}</p>
                  <p class="card-text"><b>Place: </b>${detail.place}</p>
                  <p class="card-text"><b>Capacity: </b>${detail.capacity}</p>
                  <p class="card-text"><b>Assitance: </b>${detail.assistance}</p>
                  <p class="card-text"><b>Price: </b>${detail.price}</p>
                </div>
              </div>
            </div>
          </div>
          `;
          console.log("HECHO");
        } else {
          eventDetails.innerHTML = `<p>Event not found.</p>`;
        }
    
  });
