'use strict';




(function () {
    // Load videos and render them on screen
    loadFilmList()






})();







//filmService.js

function renderFilmList(data) {
    var strHTML = ``;
    data.forEach(film => {
        strHTML += `
            <li class="lazy">
                <h3>${film.title}</h3>
                <p>${film.release_year}</p>
                <p>${film.director}</p>
                <h6>More info...</h6>
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