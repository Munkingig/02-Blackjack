   
const miModulo = (()=>{

    'use strict'
 /**
     * 2C = Two of Clubs
     * 2D = Two of Diaminds
     * 2H = two of Hearts
     * 2H = Two of Spades
     */

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    //let puntosJugador = 0,
     //   puntosComputadora = 0;

    let puntosJugadores = [];

    //let stop = setInterval(pintar, 2000);


    // ReferenciS DEL html
    const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    //const dicCartasJugador = document.querySelector('#jugador-cartas'),
    //   dicCartasComputadora = document.querySelector('#computadora-cartas');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    //Inicializacion del juego.
    const inicializarJuego = ( numJugadores = 2 )=>{
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i< numJugadores; i++){
            puntosJugadores.push(0);
        }

        //puntosHTML[0].innerText = 0;
        //puntosHTML[1].innerText = 0;

        //Repasar este tipo de bucle y los elementos de la funcion de flecha.

        puntosHTML.forEach(elem => elem.innerHTML = 0);//Acuerdate de incluirlo en el anterior bucle para pedirle menos tareas a nuestra cpu.

        //dicCartasComputadora.innerHTML = '';
        //dicCartasJugador.innerHTML = '';

        divCartasJugador.forEach(elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }


    //Crar un nuevo deck
    const crearDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);

    }


    //Tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }

        return deck.pop();
    }




    //Obtener el valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        let puntos = 0;

        if (isNaN(valor)) {
            puntos = (valor === 'A') ? 11 : 10;
        } else {
            puntos = valor * 1;
        }
    }

    /**Obtener el valor de la carta
     * de forma mas eficiente
     * usadndo condiciones ternarias
     */
    const valorCarta2 = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;

    }


    //Turno : 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno )=>{

            //puntosComputadora += valorCarta2(carta);
            //puntosHTML[1].innerText = puntosComputadora;

            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta2(carta);
            puntosHTML[turno].innerText = puntosJugadores[turno]
            return puntosJugadores[turno];
    }


    const crearCarta = ( carta, turno ) =>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);

    }


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


        setTimeout(() => {
            if (puntosComputadora > 21) {
                alert('Ganas la partida');
            } else if ((puntosComputadora === 21) && (puntosMinimos === 21)) {
                alert('Empate');

            } else if (puntosComputadora > puntosMinimos) {
                alert('Pierdes la partida');
            }
        }, 100)
    }

    //Prueba de intervalo de tiempo


    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador =  acumularPuntos(carta, 0);
 
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            setTimeout(() => {
                alert('Has Perdido');
            }, 100)
        } else if (puntosJugador === 21) {
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }


    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();

    });

    const empezar = ()=>{

        inicializarJuego();
        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }



    //Funcion sleep

   /**  const sleep = (milliseconds) => {
        let start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }*/



    return {
        nuevoJuego: inicializarJuego
    };

}) ();   
  