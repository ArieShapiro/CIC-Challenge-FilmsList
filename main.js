'use strict';


(function () {
    // Load videos and render them on screen
    loadFilmList()
})();

// {
//     "actor_1": "Siddarth",
//     "actor_2": "Nithya Menon",
//     "actor_3": "Priya Anand",
//     "director": "Jayendra",
//     "locations": "Epic Roasthouse (399 Embarcadero)",
//     "production_company": "SPI Cinemas",
//     "release_year": "2011",
//     "title": "180",
//     "writer": "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba "
//     }

//filmService.js

function renderFilmList(data) {
    var strHTML = ``;
    data.forEach(film => {
        strHTML += `
            <li class="lazy tooltip">
                <i class="fas fa-film"></i>
                <p><b>Title: </b>${film.title}</p>
                <p><b>Year: </b>${film.release_year}</p>
                <p><b>Producer: </b>${film.director}</p>
                <h6>Additional Info..
                    <div class="tooltiptext">
                        <p><b>Location:</b> ${film.locations}</p>
                        <p><b>Actors: </b>${film.actor_1}, ${film.actor_2}, ${film.actor_3}</p>
                        <p><b>Writer: </b>${film.writer}</p>
                        <p><b>Production Company: </b>${film.production_company}</p>                    
                    </div>
                </h6>
                <i class="fas fa-hand-point-up"></i>
            </li>                   
        `;
    });
    document.querySelector('.films-list').innerHTML = strHTML;
}


function loadFilmList() {
    axios.get('https://data.sfgov.org/resource/wwmu-gmzc.json').then(res => {
        renderFilmList(res.data);
    }).catch();
}

function onVideoSearch(ev) {

    ev.preventDefault();

    // Retrieve search term
    var searchValue = document.querySelector('.search-box').value;

    loadFilteredFilmList(searchValue);

    // renderFilmList(data);
}




function loadFilteredFilmList(value) {

    axios.get('https://data.sfgov.org/resource/wwmu-gmzc.json').then(res => {

        var regex = new RegExp(value, "gi");
        var searchValue = res.data.filter(film => {
            return film.title.match(regex);
        });
        renderFilmList(searchValue);
    }).catch();

}