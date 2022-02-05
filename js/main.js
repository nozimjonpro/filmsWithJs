const elFilmsList = document.querySelector('.films__list');
const elFilmsTemplate = document.querySelector('#films__template').content;
const elFilmsGenresTemplate = document.querySelector('#films-geres__template').content;
const elFilmsForm = document.querySelector('.films__form');
const elFilmsSelect = document.querySelector('.films__select');
const elFilmsInputForFiltering = document.querySelector('.films__input');
const elSelect = document.querySelector('.select__sort');

function renderSelect(array, select){
    const newSelect = [];
    array.forEach(film=>{
        film.genres.forEach(genre=>{
            if(!newSelect.includes(genre)){
                newSelect.push(genre)
            }
        })
    })
    newSelect.forEach(option=>{
        let newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        select.appendChild(newOption)
    })
}

function elementCreater(element){
    const newOption = document.createElement('option');
    newOption.value = 'All';
    newOption.textContent = 'All'
element.appendChild(newOption)
}


function renderGenres(array, element){
    array.forEach(genre =>{
        const genreTemplate = elFilmsGenresTemplate.cloneNode(true);
        genreTemplate.querySelector('.films__genre').textContent = genre;
        element.appendChild(genreTemplate)
    })
}

function normalizeDate(format){
    const newDate = new Date(format);
    const day = String(newDate.getDate()).padStart(2, 0)
    const month = String(newDate.getMonth()+1).padStart(2, 0)
    const year = newDate.getFullYear();
    return day + '.' + month + '.' + year
}

function renderFilms(array, element){
    element.innerHTML = null;
    array.forEach(film => {
        let filmTemplate = elFilmsTemplate.cloneNode(true);
        filmTemplate.querySelector('.films__heading').textContent = film.title;
        filmTemplate.querySelector('.films__poster').src = film.poster;
        filmTemplate.querySelector('.films__overview').textContent = film.overview;
        filmTemplate.querySelector('.films__time').textContent = normalizeDate(film.release_date);
        
        const elGenres = filmTemplate.querySelector('.films__genres');
        renderGenres(film.genres, elGenres)
        element.appendChild(filmTemplate);
    });
}

function filterer (array){
    const optionValue = elFilmsSelect.value.trim();
    const filteredFilms = array.filter(f=>f.genres.includes(optionValue));
    const inputValue = elFilmsInputForFiltering.value.trim();
    const regex = new RegExp(inputValue, 'gi')
    const filtered = filteredFilms.filter(f=>f.title.match(regex))
    renderFilms(filtered, elFilmsList)
    if(optionValue == 'All'){
        renderFilms(films, elFilmsList)
    }
}

function sorter (array){
    const optionJon = elSelect.value.trim();
    if(optionJon === 'a_z'){
        array.sort((a, b)=>{
            let sorterVal = a.title>b.title
            if(sorterVal){
                return 1;
            }else if(!sorterVal){
                return -1;
            } else{
                return 0;
            }
        })
    } else{
        films.sort((a, b)=>{
            let sorterVal = a.title>b.title
            if(!sorterVal){
                return 1;
            }else if(sorterVal){
                return -1;
            } else{
                return 0;
            }
        })
    }
}

elFilmsForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
sorter(films)
    filterer(films)
})

elementCreater(elFilmsSelect)
renderSelect(films, elFilmsSelect)
renderFilms(films, elFilmsList)