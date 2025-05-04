
// _________________________________
function riempi(num){
    
    const principale = document.querySelector('#main');
    let element;
    for(let i = 0; i<=num;i++){
       element = creaFiglioPost(i%8);
        principale.appendChild(element);
    }

    console.log(principale.dataset.message);
}
function creaFiglioPost(n){
    let classe1 = "post"
    let classe2 = "post"+n;
    
    let element = document.createElement('div');
    element.classList.add(classe1);
    element.classList.add(classe2);

    let nome = document.createElement('p');
    nome.textContent = 'Nome '+n;
    element.appendChild(nome);
    element = aggiungiDiv(element, "commenti.png");
    element = aggiungiDiv(element, "like.png");
    return element;
}
 function aggiungiDiv(element, testo){
    const divv = document.createElement('div');
    const img = document.createElement('img');
    if(testo === 'like.png'){
        divv.classList.add('cuore');
    }
    divv.classList.add('toglilike');
    img.src=testo;
    divv.appendChild(img);
    element.appendChild(divv);
    return element;
 }

     riempi(11);
//__________________________________
function mostraPost(event){
    const piccolo = event.currentTarget;
    const grande = document.querySelector('#postView');
    const foto = document.querySelector('#visFoto');
    grande.classList.remove('sparisci');
    foto.classList.add(piccolo.classList[1]);
    document.body.classList.add('noscroll');
}

function chiudiPost(event){
    const grande = document.querySelector('#postView');
    grande.classList.add('sparisci');
    const foto = document.querySelector('#visFoto');
    foto.classList.remove(foto.classList[0]);
    document.body.classList.remove('noscroll');
}

const listaPost = document.querySelectorAll('.post');
for(let item of listaPost){
    item.addEventListener('click', mostraPost);
}
const chiudi = document.querySelector('#visFoto div');
chiudi.addEventListener('click', chiudiPost);
// 
//_______________________________________________
function mettilike(event){
    const divv = event.currentTarget;
    divv.classList.add('mettilike');
    divv.classList.remove('toglilike');
    const immagine = divv.childNodes[0];
    immagine.src = 'fire.png'
    divv.addEventListener('click', toglilike);
    divv.removeEventListener('click', mettilike); 
    event.stopPropagation();
}
function toglilike(event){
    const divv = event.currentTarget;
    divv.classList.add('toglilike');
    divv.classList.remove('mettilike');
    const immagine = divv.childNodes[0];
    immagine.src = 'like.png';
    divv.addEventListener('click', mettilike);
    divv.removeEventListener('click', toglilike);
    event.stopPropagation();
}

const Listacuore = document.querySelectorAll(".cuore");
for (let item of Listacuore){
    item.addEventListener('click', mettilike);
}
//
//
function mostraLogin(){
    const wind = document.querySelector('#LoginWindow');
    wind.classList.remove('sparisci');
    document.body.classList.add('noscroll');
}

function nascondiLogin(event){
    const wind = document.querySelector('#LoginWindow');
    wind.classList.add('sparisci');
    document.body.classList.remove('noscroll');
    event.stopPropagation();
}
document.querySelector('#login').addEventListener('click', mostraLogin);
document.querySelector('#upLogin div').addEventListener('click', nascondiLogin);
//
//
function appareMenu(event){
    const menuu = document.querySelector('#menuContainer');
    menuu.classList.remove('sparisci');
    event.currentTarget.removeEventListener('click', appareMenu)
    event.currentTarget.addEventListener('click', scompareMenu);

}
function scompareMenu(event){
    const menuu = document.querySelector('#menuContainer');
    menuu.classList.add('sparisci');
    event.currentTarget.addEventListener('click', appareMenu)
    event.currentTarget.removeEventListener('click', scompareMenu);
}

document.querySelector('#menu').addEventListener('click', appareMenu);
//_______________________________________________________
//_______________________________________________________
//_______________________________________________________


const YOUR_ACCESS_KEY = 'ACCESS_KEY';
function take(event){
    event.preventDefault();
    const inserimento = document.querySelector('#domandabox');
    const qu = encodeURIComponent(inserimento.value);
    if(inserimento.value){
    console.log(qu);
    const url = 'https://api.unsplash.com/search/photos?query='+qu;
    console.log(url);
    fetch(url, {
        headers: {
          Authorization: `Client-ID ${YOUR_ACCESS_KEY}`
        }
      })
    .then(onSucc, onErr)
    .then(onJson);
    }
}

function onErr(err){
    console.log('errore ->'+err);
}
function onSucc(res){
    return res.json();
}
function onJson(json){
    console.log(json.results);

    const blocco = document.querySelector('#ricerca');
    blocco.innerHTML = '';
    blocco.parentNode.classList.remove('sparisci');
    for(let item of json.results){
       const imag = document.createElement('img');
       imag.src = item.urls.small;
       blocco.appendChild(imag);
    }
    
}

document.querySelector('form').addEventListener('submit', take);

function cercaFocus(event){
    const testo = event.currentTarget;
    frase = testo.value;
    testo.value = '';
}

const domanda = document.querySelectorAll('input');
for(let item of domanda){
item.addEventListener('focus', cercaFocus);
}

function chiudiRicerca(event){
    document.querySelector('#ricerca')
    .parentNode.classList.add('sparisci');

}

document.querySelector('#mostraRis').addEventListener('click', chiudiRicerca);
//_________________________________________________________
//____________________________________________________________
//________________________________________________________

function RandomRGB() {
    const n1 = Math.floor(Math.random() * 256);
    const n2 = Math.floor(Math.random() * 256);
    const n3 = Math.floor(Math.random() * 256);
    return `rgb=${n1},${n2},${n3}`;
}

function generaColore(event){
    event.preventDefault();
    const randomRGB = RandomRGB();
    const richiesta = 'https://www.thecolorapi.com/id?'+randomRGB;

    fetch(richiesta)
    .then(onSucc,onErr)
    .then(onJsonColor);
}

function onJsonColor(json){
    console.log(json);
    const immagine = document.querySelector('#colore img');
    immagine.src = json.image.named;
    const dati = document.querySelector('#dati');
    dati.innerHTML='';
    const span1 = document.createElement('span');
    span1.append('hex( '+json.hex.value+' )');
    const span2 = document.createElement('span');
    span2.append(json.cmyk.value);
    const span3 = document.createElement('span');
    span3.append(json.rgb.value);
    dati.appendChild(span1);
    dati.appendChild(span2);
    dati.appendChild(span3);
}
document.querySelector('#generaColore').addEventListener('submit', generaColore);
//______________________________________________________________________________________
