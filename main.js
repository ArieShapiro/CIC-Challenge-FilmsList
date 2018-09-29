'use strict';

(function () {

    // Load videos and render them on screen
    // console.log(loadFilmList());
    loadFilmList()

})();



















//filmService.js

function renderFilmList(data) {
    var strHTML = ``;
    data.forEach(film => {
        strHTML += `
            <li>
                ${film.title}
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
