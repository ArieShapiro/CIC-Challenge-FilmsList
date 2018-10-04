'use strict';

//init self invoking function
(() => {
    loadFilmList()
})();

//Click on more info btn
function onMoreInfo(location, actor1, actor2, actor3, writer, company) {
    showMoreInfo(location, actor1, actor2, actor3, writer, company);
}

//Typing text to the search field (reacts to every letter typing) 
function onVideoSearch(ev) {
    ev.preventDefault();
    var searchValue = document.querySelector('.search-box').value;
    loadFilteredFilmList(searchValue);
}

//Click on go to the top circle 
function onScrollToTop() {
    ScrollToTop();
}

/*********************************************************************************************/

//Renders the films on the screen
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
                     onclick="onMoreInfo('${film.locations}', '${film.actor_1}', '${film.actor_2}', '${film.actor_3}', '${film.writer}', '${film.production_company}')">
                     <i class="fas fa-hand-point-right"></i>
                     More Info</button>
                </li>                   
            `;
        orderNum++;
    });
    document.querySelector('.films-list').innerHTML = strHTML;

    //Lasy Loading with JQuery
    $("#li-list li").slice(20).hide();
    var mincount = 5;
    var maxcount = 10;
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 400) {
            $("#li-list li").slice(mincount, maxcount).fadeIn(1200);
            mincount = mincount + 10;
            maxcount = maxcount + 10;
        }
    });
}

//Shows addintional info with swal
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

//Makes AJAX request and invokes rendeeFilmList function
function loadFilmList() {
    axios.get('https://data.sfgov.org/resource/wwmu-gmzc.json').then(res => {
        renderFilmList(res.data);
    }).catch();
}

//Gives to renderFilmList function's parameter only the searcheble data  
function loadFilteredFilmList(value) {
    axios.get('https://data.sfgov.org/resource/wwmu-gmzc.json').then(res => {
        var regex = new RegExp(value, "gi");
        var searchValue = res.data.filter(film => {
            return film.title.match(regex);
        });
        renderFilmList(searchValue);
    }).catch();
}

//Smooth scroll to the top
function ScrollToTop() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(ScrollToTop);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
}






