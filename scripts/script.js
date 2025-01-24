"use strict";

window.onload = () => {

    // Fondo del juego
    document.body.style.backgroundImage = "url('./imagenes/estrellas.jpg')";
    // Música ambiental de fondo
    document.body.addEventListener("click", function () {
        musicaFondo.play()
    });

    // Variables para el desarrollo de los juegos
    let horaInicio = null;
    let intervaloCronometro = null;
    let bloqueoEleccion = false;
    let primeraEleccion = null;
    let contadorIntentos = 0;

    // Div principal
    const general = document.getElementById("contenedorCompleto");
    general.style.width = "80%";
    general.style.height = "900px";
    general.style.display = "flex";
    general.style.justifyContent = "space-between";
    general.style.alignItems = "flex-start";
    general.style.marginLeft = "10%";
    general.style.marginRight = "10%";

    // Div contenedor para lo divMoveTime y divBotones en una columna
    const contenedorIzquierda = document.createElement("div");
    contenedorIzquierda.id = "contenedorIzquierda";
    contenedorIzquierda.style.display = "flex";
    contenedorIzquierda.style.flexDirection = "column";
    contenedorIzquierda.style.width = "30%";
    contenedorIzquierda.style.height = "900px";
    general.appendChild(contenedorIzquierda);

    // Div donde va el juego
    const divJuego = document.createElement("div");
    divJuego.id = "juego";
    divJuego.style.width = "70%";
    divJuego.style.height = "900px";
    divJuego.style.display = "flex";
    divJuego.style.justifyContent = "center";
    divJuego.style.alignItems = "center";
    general.appendChild(divJuego);

    // Div parrafo que invita a jugar
    const divInvitacion = document.createElement("div");
    divInvitacion.id = "invitacion"
    divInvitacion.innerHTML = "Pulsa 4x4 o 6x6 para comenzar el juego";
    divInvitacion.style.color = "goldenrod";
    divInvitacion.style.fontSize = "60px";
    divJuego.appendChild(divInvitacion);

    // Div oculto 4x4
    const panel4x4 = document.createElement("div");
    panel4x4.id = "panel4x4";
    panel4x4.style.width = "100%";
    panel4x4.style.height = "900px";
    panel4x4.style.display = "none";
    panel4x4.style.justifyContent = "center";
    panel4x4.style.alignItems = "center";
    divJuego.appendChild(panel4x4);

    //Div oculto 6x6
    const panel6x6 = document.createElement("div");
    panel6x6.id = "panel6x6";
    panel6x6.style.width = "100%";
    panel6x6.style.height = "900px";
    panel6x6.style.display = "none";
    panel6x6.style.justifyContent = "center";
    panel6x6.style.alignItems = "center";
    divJuego.appendChild(panel6x6);

    // Div donde va el contador de movimientos y contador de tiempo;
    const divMoveTime = document.createElement("div");
    divMoveTime.id = "moveTime";
    divMoveTime.style.width = "100%";
    divMoveTime.style.height = "450px";
    divMoveTime.style.flexDirection = "column";
    divMoveTime.style.color = "goldenrod";
    contenedorIzquierda.appendChild(divMoveTime);

    // Div contador movimientos
    const divMovimiento = document.createElement("div");
    divMovimiento.id = "movimiento";
    divMovimiento.style.width = "100%";
    divMovimiento.style.height = "225px";
    divMovimiento.style.display = "flex";
    divMovimiento.style.flexDirection = "column";
    divMovimiento.style.justifyContent = "center";
    divMovimiento.style.alignItems = "center";
    divMoveTime.appendChild(divMovimiento);

    // Titulo divContador
    const tituloContador = document.createElement("h2");
    tituloContador.innerHTML = "CONTADOR DE INTENTOS";
    tituloContador.style.fontSize = "35px";
    tituloContador.style.color = "goldenrod";
    tituloContador.style.marginBottom = "5px";
    divMovimiento.appendChild(tituloContador);

    // Parrafo mostrar contador
    const contadorIntentosParrafo = document.createElement("p");
    contadorIntentosParrafo.style.fontSize = "50px";
    contadorIntentosParrafo.innerHTML = "0";
    contadorIntentosParrafo.style.color = "goldenrod";
    divMovimiento.appendChild(contadorIntentosParrafo);

    // Div Tiempo
    const divTiempo = document.createElement("div");
    divTiempo.id = "tiempo";
    divTiempo.style.width = "100%";
    divTiempo.style.height = "225px";
    divTiempo.style.display = "flex";
    divTiempo.style.flexDirection = "column";
    divTiempo.style.justifyContent = "center";
    divTiempo.style.alignItems = "center";
    divMoveTime.appendChild(divTiempo);

    // Titulo divTiempo
    const tituloTiempo = document.createElement("h2");
    tituloTiempo.innerHTML = "TIEMPO";
    tituloTiempo.style.fontSize = "35px";
    tituloTiempo.style.color = "goldenrod";
    tituloTiempo.style.marginBottom = "5px";
    divTiempo.appendChild(tituloTiempo);

    // Parrafo mostrar tiempo
    const cronometroParrafo = document.createElement("p");
    cronometroParrafo.style.fontSize = "50px";
    cronometroParrafo.innerHTML = "00:00";
    cronometroParrafo.style.color = "goldenrod";
    divTiempo.appendChild(cronometroParrafo);

    // Div Botones 
    const divBotones = document.createElement("div");
    divBotones.id = "botones";
    divBotones.style.width = "100%";
    divBotones.style.height = "650px";
    contenedorIzquierda.appendChild(divBotones);

    // Div boton reiniciar
    const divBotonReinicio = document.createElement("div");
    divBotonReinicio.id = "divReiniciar";
    divBotonReinicio.style.width = "100%";
    divBotonReinicio.style.height = "150px";
    divBotonReinicio.style.display = "flex";
    divBotonReinicio.style.justifyContent = "center";
    divBotonReinicio.style.alignItems = "center";
    divBotones.appendChild(divBotonReinicio);

    // Boton reinicio
    const botonReinicio = document.createElement("button");
    botonReinicio.id = "reiniciar";
    botonReinicio.innerHTML = "REINICIAR";
    botonReinicio.style.fontSize = "20px";
    botonReinicio.style.width = "300px";
    botonReinicio.style.height = "100px";
    botonReinicio.style.borderRadius = "50px";
    botonReinicio.style.backgroundColor = "goldenrod";
    divBotonReinicio.appendChild(botonReinicio);

    // Div boton 4x4
    const divBoton4 = document.createElement("div");
    divBoton4.id = "div4x4";
    divBoton4.style.width = "100%";
    divBoton4.style.height = "150px";
    divBoton4.style.display = "flex";
    divBoton4.style.justifyContent = "center";
    divBoton4.style.alignItems = "center";
    divBotones.appendChild(divBoton4);

    // Boton 4x4
    const boton4x4 = document.createElement("button");
    boton4x4.id = "4x4";
    boton4x4.innerHTML = "4 x 4";
    boton4x4.style.fontSize = "20px";
    boton4x4.style.width = "300px";
    boton4x4.style.height = "100px";
    boton4x4.style.borderRadius = "50px";
    boton4x4.style.backgroundColor = "goldenrod";
    divBoton4.appendChild(boton4x4);

    // Div boton 6x6
    const divBoton6 = document.createElement("div");
    divBoton6.id = "div6x6";
    divBoton6.style.width = "100%";
    divBoton6.style.height = "150px";
    divBoton6.style.display = "flex";
    divBoton6.style.justifyContent = "center";
    divBoton6.style.alignItems = "center";
    divBotones.appendChild(divBoton6);

    // Boton 6x6
    const boton6x6 = document.createElement("button");
    boton6x6.id = "6x6";
    boton6x6.innerHTML = "6 x 6";
    boton6x6.style.fontSize = "20px";
    boton6x6.style.width = "300px";
    boton6x6.style.height = "100px";
    boton6x6.style.borderRadius = "50px";
    boton6x6.style.backgroundColor = "goldenrod";
    divBoton6.appendChild(boton6x6);

    // Arrays para el 4x4 y 6x6
    const parejas4x4 = [
        { src: "./imagenes/alaska.jpg", alt: "1" },
        { src: "./imagenes/marioVaquerizo.jpg", alt: "1" },
        { src: "./imagenes/albertoRuiz.jpg", alt: "2" },
        { src: "./imagenes/pacoPalacios.jpg", alt: "2" },
        { src: "./imagenes/andreuBuenafuente.jpg", alt: "3" },
        { src: "./imagenes/silviaAbril.jpg", alt: "3" },
        { src: "./imagenes/donQuijote.jpg", alt: "4" },
        { src: "./imagenes/sanchoPanza.jpg", alt: "4" },
        { src: "./imagenes/felipeBorbon.jpg", alt: "5" },
        { src: "./imagenes/leticiaOrtiz.jpg", alt: "5" },
        { src: "./imagenes/javierBardem.jpg", alt: "6" },
        { src: "./imagenes/penelopeCruz.jpg", alt: "6" },
        { src: "./imagenes/marioBros.jpg", alt: "7" },
        { src: "./imagenes/princessPeach.jpg", alt: "7" },
        { src: "./imagenes/tomHolland.jpg", alt: "8" },
        { src: "./imagenes/zendaya.jpg", alt: "8" },
    ];
    parejas4x4.sort(() => Math.random() - 0.5);

    const parejas6x6 = [
        { src: "./imagenes/alaska.jpg", alt: "1" },
        { src: "./imagenes/marioVaquerizo.jpg", alt: "1" },
        { src: "./imagenes/albertoRuiz.jpg", alt: "2" },
        { src: "./imagenes/pacoPalacios.jpg", alt: "2" },
        { src: "./imagenes/andreuBuenafuente.jpg", alt: "3" },
        { src: "./imagenes/silviaAbril.jpg", alt: "3" },
        { src: "./imagenes/donQuijote.jpg", alt: "4" },
        { src: "./imagenes/sanchoPanza.jpg", alt: "4" },
        { src: "./imagenes/felipeBorbon.jpg", alt: "5" },
        { src: "./imagenes/leticiaOrtiz.jpg", alt: "5" },
        { src: "./imagenes/javierBardem.jpg", alt: "6" },
        { src: "./imagenes/penelopeCruz.jpg", alt: "6" },
        { src: "./imagenes/marioBros.jpg", alt: "7" },
        { src: "./imagenes/princessPeach.jpg", alt: "7" },
        { src: "./imagenes/tomHolland.jpg", alt: "8" },
        { src: "./imagenes/zendaya.jpg", alt: "8" },
        { src: "./imagenes/juanMuñoz.jpg", alt: "9" },
        { src: "./imagenes/joseMota.jpg", alt: "9" },
        { src: "./imagenes/elsaPataky.jpg", alt: "10" },
        { src: "./imagenes/chrisHemsworth.jpg", alt: "10" },
        { src: "./imagenes/rocioJurado.jpg", alt: "11" },
        { src: "./imagenes/ortegaCano.jpg", alt: "11" },
        { src: "./imagenes/franco.jpg", alt: "12" },
        { src: "./imagenes/hitler.jpg", alt: "12" },
        { src: "./imagenes/javierCalvo.jpg", alt: "13" },
        { src: "./imagenes/javierAmbrossi.jpg", alt: "13" },
        { src: "./imagenes/cristinaPedroche.jpg", alt: "14" },
        { src: "./imagenes/davidMuñoz.jpg", alt: "14" },
        { src: "./imagenes/coll.jpg", alt: "15" },
        { src: "./imagenes/tip.jpg", alt: "15" },
        { src: "./imagenes/kikoMatamoros.jpg", alt: "16" },
        { src: "./imagenes/cotoMatamoros.jpg", alt: "16" },
        { src: "./imagenes/arwen.jpg", alt: "17" },
        { src: "./imagenes/aragorn.jpg", alt: "17" },
        { src: "./imagenes/jeniferHermoso.jpg", alt: "18" },
        { src: "./imagenes/rubiales.jpg", alt: "18" },
    ]
    parejas6x6.sort(() => Math.random() - 0.5);

    // Crear tabla 4x4
    const juego4x4 = crearTabla(4, parejas4x4);
    panel4x4.appendChild(juego4x4);

    // Crear Tabla 6x6
    const juego6x6 = crearTabla(6, parejas6x6);
    panel6x6.appendChild(juego6x6);

    // Funcionabilidad del boton 4x4
    boton4x4.addEventListener("click", function () {
        panel6x6.style.display = "none";
        divInvitacion.style.display = "none";
        panel4x4.style.display = "flex";
    });

    // Funcionabilidad del boton 6x6
    boton6x6.addEventListener("click", function () {
        panel4x4.style.display = "none";
        divInvitacion.style.display = "none";
        panel6x6.style.display = "flex";
    });

    // Funcionabilidad del boton de reinicio
    botonReinicio.addEventListener("click", function () {
        horaInicio = null;
        contadorIntentos = 0;
        contadorIntentosParrafo.innerHTML = "0";
        cronometroParrafo.innerHTML = "00:00";

        clearInterval(intervaloCronometro);
        intervaloCronometro = null;

        // Definir la tabla activa
        let tablaActiva;

        // Determinar la tabla activa
        if (panel4x4.style.display === "flex") {
            tablaActiva = panel4x4.querySelectorAll("td");
        } else if (panel6x6.style.display === "flex") {
            tablaActiva = panel6x6.querySelectorAll("td");
        }

        // Si hay una tabla activa, hacer el reset de las celdas
        if (tablaActiva) {
            tablaActiva.forEach(celda => {
                // Restablecer el fondo a dorso
                celda.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                // Limpiar los atributos antes de reasignar
                celda.removeAttribute("name");
                celda.removeAttribute("alt");
            });
        }

        // Resets de celdas según la tabla activa
        if (panel4x4.style.display === "flex") {
            parejas4x4.sort(() => Math.random() - 0.5);
            let indice4x4 = 0;
            tablaActiva.forEach(celda => {
                if (indice4x4 < parejas4x4.length) {
                    celda.setAttribute("name", parejas4x4[indice4x4].src);
                    celda.setAttribute("alt", parejas4x4[indice4x4].alt);
                    indice4x4++;
                }
            });
        } else if (panel6x6.style.display === "flex") {
            parejas6x6.sort(() => Math.random() - 0.5);
            let indice6x6 = 0;
            tablaActiva.forEach(celda => {
                if (indice6x6 < parejas6x6.length) {
                    celda.setAttribute("name", parejas6x6[indice6x6].src);
                    celda.setAttribute("alt", parejas6x6[indice6x6].alt);
                    indice6x6++;
                }
            });
        }

        // Restablecer visibilidad de los elementos de tiempo y movimientos
        divTiempo.style.display = "flex";
        divMovimiento.style.display = "flex";

        // Ocultar resultados si existen
        let resultadoDiv = document.getElementById("resultado");
        if (resultadoDiv) {
            resultadoDiv.innerHTML = "";
            resultadoDiv.style.display = "none";
        }
    });


    // Desarrollo del 4x4
    juego4x4.onclick = (evento) => {
        if (!horaInicio) {
            horaInicio = new Date();
            intervaloCronometro = setInterval(actualizarCronometro, 1000);
        }

        if (bloqueoEleccion) return;

        const carta = evento.target;
        if (carta.style.backgroundImage === 'url("./imagenes/dorso.jpg")') {
            carta.style.backgroundImage = "url(" + carta.getAttribute("name") + ")";

            if (!primeraEleccion) {
                primeraEleccion = carta;
                contadorIntentos++;
            } else {
                bloqueoEleccion = true;
                if (primeraEleccion.getAttribute("alt") === carta.getAttribute("alt")) {
                    primeraEleccion = null;
                    sonidoAcierto.play();
                    bloqueoEleccion = false;
                    comprobarTodasParejas();
                } else {
                    sonidoError.play();
                    setTimeout(() => {
                        carta.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                        primeraEleccion.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                        primeraEleccion = null;
                        bloqueoEleccion = false;
                    }, 1000);
                }
            }
        }
        contadorIntentosParrafo.innerHTML = contadorIntentos;
    };

    // Desarrollo del 6x6
    juego6x6.onclick = (evento) => {
        if (!horaInicio) {
            horaInicio = new Date();
            intervaloCronometro = setInterval(actualizarCronometro, 1000);
        }

        if (bloqueoEleccion) return;

        const carta = evento.target;
        if (carta.style.backgroundImage === 'url("./imagenes/dorso.jpg")') {
            carta.style.backgroundImage = "url(" + carta.getAttribute("name") + ")";

            if (!primeraEleccion) {
                primeraEleccion = carta;
                contadorIntentos++;
            } else {
                bloqueoEleccion = true;
                if (primeraEleccion.getAttribute("alt") === carta.getAttribute("alt")) {
                    primeraEleccion = null;
                    sonidoAcierto.play();
                    bloqueoEleccion = false;
                    comprobarTodasParejas();
                } else {
                    sonidoError.play();
                    setTimeout(() => {
                        carta.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                        primeraEleccion.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                        primeraEleccion = null;
                        bloqueoEleccion = false;
                    }, 1000);
                }
            }
        }
        contadorIntentosParrafo.innerHTML = contadorIntentos;
    };

    // Funcion para crear las tablas y evitar repeticiones en el codigo
    function crearTabla(tamanoCuadricula, arrayParejas, indiceInicial = 0) {
        let indice = indiceInicial;
        const tabla = document.createElement("table");
        tabla.style.borderSpacing = "10px";
        tabla.style.width = "100%";
        tabla.style.height = "900px";

        for (let i = 0; i < tamanoCuadricula; i++) {
            const fila = document.createElement("tr");
            for (let j = 0; j < tamanoCuadricula; j++) {
                const celda = document.createElement("td");
                celda.style.height = "120px";
                celda.style.width = "250px";
                celda.style.borderRadius = "30px";
                celda.style.border = "1px solid black";
                celda.style.backgroundImage = "url('./imagenes/dorso.jpg')";
                celda.style.backgroundSize = "cover";
                celda.style.backgroundRepeat = "no-repeat";
                celda.style.backgroundPosition = "center";
                celda.style.transition = "background-image 0.5s ease-in-out";
                celda.setAttribute("name", arrayParejas[indice].src);
                celda.setAttribute("alt", arrayParejas[indice].alt);
                fila.appendChild(celda);
                indice++;
            }
            tabla.appendChild(fila);
        }
        return tabla;
    }

    // Función para actualizar el cronómetro
    function actualizarCronometro() {
        const horaActual = new Date();
        const diferencia = horaActual - horaInicio;

        const minutos = Math.floor(diferencia / 60000);
        const segundos = Math.floor((diferencia % 60000) / 1000);

        const formatoMinutos = minutos < 10 ? "0" + minutos : minutos;
        const formatoSegundos = segundos < 10 ? "0" + segundos : segundos;
        const formatoTiempo = formatoMinutos + ":" + formatoSegundos;

        cronometroParrafo.innerHTML = formatoTiempo;
    }

    // Funcion para comprobar si todas las parejas están volteadas
    function comprobarTodasParejas() {

        let tablaActiva;

        if (panel4x4.style.display === "flex") {
            tablaActiva = panel4x4.querySelectorAll("td");
        } else if (panel6x6.style.display === "flex") {
            tablaActiva = panel6x6.querySelectorAll("td");
        }

        let juegoCompletado = true;
        tablaActiva.forEach(celda => {
            if (celda.style.backgroundImage.includes("dorso")) {
                juegoCompletado = false;
            }
        });

        if (juegoCompletado) {
            mostrarPuntiacion();
        }
    }

    // Funcion para mostrar la puntuación y tiempo final
    function mostrarPuntiacion() {

        // Parar el tiempo
        if (intervaloCronometro) {
            clearInterval(intervaloCronometro);
            intervaloCronometro = null;
        }

        // Ocultar divs de tiempo y movimientos
        divTiempo.style.display = "none";
        divMovimiento.style.display = "none";

        // Crear div de resultado
        const resultadoDiv = document.createElement("div");
        resultadoDiv.id = "resultado";
        resultadoDiv.style.flexDirection = "column";
        resultadoDiv.style.textAlign = "center";
        resultadoDiv.style.justifyContent = "center";
        resultadoDiv.style.display = "flex";

        const resultadoMovimientos = document.createElement("h2");
        resultadoMovimientos.innerHTML = "Movimientos: " + contadorIntentos;
        resultadoMovimientos.style.fontSize = "40px";

        const resultadoTiempo = document.createElement("h2");
        resultadoTiempo.innerHTML = "Tiempo: " + cronometroParrafo.innerHTML;
        resultadoTiempo.style.fontSize = "40px";

        resultadoDiv.appendChild(resultadoMovimientos);
        resultadoDiv.appendChild(resultadoTiempo);

        divMoveTime.appendChild(resultadoDiv);

        sonidoAplausos.play();
    }

    // Sonidos acierto, fallo y aplausos
    const sonidoAcierto = new Audio('./musica/acierto.mp3');
    sonidoAcierto.volume = 0.4;
    const sonidoError = new Audio('./musica/fallo.mp3');
    const sonidoAplausos = new Audio("./musica/aplausos.mp3");
    sonidoAplausos.volume = 0.2;
    const musicaFondo = new Audio("./musica/fondo.mp3");

}
