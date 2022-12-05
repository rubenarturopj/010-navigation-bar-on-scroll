/*
    Element.getBoundingClientRect() method returns the size of an element and its 
    position relative to the viewport.
    
    pageYOffset is a read - only window property that
    returns the number of pixels the document has been scrolled vertically.
    
    slice extracts a section of a string without modifying original string
    
    offsetTop - A Number, representing the top position of the element, in pixels
*/

// *********************************************
// ********** set date automatically ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// menu desplegable ***************************
// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function() {
    // esta forma de poner la funcionabilidad está bien si sabemos que no va a haber cambios
    // en la lista o el menú. Sin embargo, si queremos hacerlo dinámico y ajustarlo al número
    // de entradas que se pongan en el  menú, tenemos que hacerlo de otra forma. Caso de la
    // vida real: la compañía decide agregar/quitar otro servicio y por lo tanto hay que 
    // modificar el número de secciones de la página y del menú desplegable. Queremos que el
    // fondo blanco se ajuste de manera automática. Que todo se de forma automática.

    // linksContainer.classList.toggle("show-links");

    // con la nueva forma vamos a usar medidas alturas de pixeles

    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }

// es importante ir a revisar el CSS (puse una nota) para configurar la altura de la página
// cuando se despliegue o se recoja el menú desplegable. Javascript añade style de forma inline
// y tiene mayor prioridad; sin emabrgo, como no es lo que queremos siempre pues vamos al
// css a ponerle    altura:auto    y la flag   !important   para darle toda la prioridad

});


// ****************************************************
// ********** fixed navbar ************
// para que la barra de navegación se quede fija al desplazarse hacia abajo por la página
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link"); //top-link es la clase del boton al final del html

//vamos a usar medidas, el numero de pixeles que se han desplazado
window.addEventListener("scroll", function() {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }


    // ***** el botón para regresar arriba****
    // tmb se desencadena con el desplazamiento hacia abajo de la página web

    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }


});

// ********** smooth scroll ************
// ya está escrito en el css, pero por mi configuración de windows 11 no se ve
// porque le quité esas transiciones pendejas a windows 11


// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function(link){
    link.addEventListener("click", function(eventObject) {
        // prevent default
        eventObject.preventDefault();
        // navigate to specific spot
        // vamos a sacarle el href a cada eleemento y luego con slice vamos a quitarle
        // el primer caracter que es el hasshtag. por ejemplo #about, sliced = about
        const id = eventObject.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        //calculate the heights las alturas para ajustar el salto de seccion a seccion
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav"); // true or false

        let position = element.offsetTop - navHeight;
        // cuando abrimos la pâgina full screen la barra de navegacion no esta expandida
        // cuando emepzamos a bajar po lapagina se expande y toma escpaio de la pâgina, afectando
        // la altura o medida o posicion de todo lo que esta despuês
        // con esto de abajo ya debe quedar es desplazarse por secciones
        if (!fixedNav) {
            position = position - navHeight;
        }

        // ahora para la version celular
        if (navHeight > 82) {
            position = position + containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position,
        });
        linksContainer.style.height = 0;
    });
});