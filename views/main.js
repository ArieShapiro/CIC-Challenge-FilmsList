'use strict';


(function () {
    // Load videos and render them on screen
    loadFilmList()
})();

//filmService.js

function renderFilmList(data) {
    var strHTML = ``;
    var orderNum = 1;
    data.forEach(film => {
        strHTML += `
            <li class="animated fadeIn delay-2s">
                <i class="fas fa-film"></i><span>#${orderNum}</span>
                <p><b>Title: </b>${film.title}</p>
                <p><b>Year: </b>${film.release_year}</p>
                <p><b>Producer: </b>${film.director}</p>
                <button 
                 onclick="showMoreInfo('${film.locations}', '${film.actor_1}', '${film.actor_2}', '${film.actor_3}', '${film.writer}', '${film.production_company}')">
                 <i class="fas fa-hand-point-right"></i>
                 More Info</button>
            </li>                   
        `;
        orderNum++;
    });
    document.querySelector('.films-list').innerHTML = strHTML;
}

function showMoreInfo(location, actor1, actor2, actor3, writer, company) {
    swal({
        title: "More Info:",
        text: `
             Location:
             ${location}

             Actors:
             ${actor1}, ${actor2}, ${actor3}

             Writer:
             ${writer}

             Production Company:
             ${company}
        `,
    });
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

function onScrollToTop() {
    ScrollToTop();
}

//Smooth scroll to the top
function ScrollToTop(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(ScrollToTop);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}