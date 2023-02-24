
class Memorama {
    
    constructor() {
        this.canPlay = false;
        this.card1 = null;
        this.card2 = null;
        this.availableImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );
        this.maxPairNumber = this.availableImages.length;
        this.startGame();
        
    }



    startGame() {
        this.foundPairs = 0;
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
    }

    setNewOrder() {
        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );
    }

    setImagesInCards() {
        for (const key in this.cards) {     
            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];
            card.dataset.image = image;
            imgLabel.src = `assets/images/${image}.png`;
        }
    }

    openCards() {
        this.cards.forEach(card => card.classList.add("opened"));
        setTimeout(() => {
            this.closeCards();
        }, 3500);
    }

    closeCards() {
        this.cards.forEach(card => card.classList.remove("opened"));
        this.addClickEvents();
        this.canPlay = true;
    }

    addClickEvents() {
        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));
        start();
    }

    removeClickEvents() {
        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));
        
    }

    flipCard(e) {
        const clickedCard = e.target;
        if (this.canPlay && !clickedCard.classList.contains("opened")) {   
            clickedCard.classList.add("opened");
            this.checkPair( clickedCard.dataset.image );
        }
    }

    checkPair(image) {
        if (!this.card1) this.card1 = image;
        else this.card2 = image;
        if (this.card1 && this.card2) {
            if (this.card1 == this.card2) {
                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300)   
                aciertos++;
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`; 
            }
            else {
                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 600)
            }
          }
          
    }

    resetOpenedCards() { 
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);
        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");
        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;
    }

    checkIfWon() {
        this.foundPairs++;
        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;
        if (this.maxPairNumber == this.foundPairs) {
            alert("¡Ganaste!");
            this.setNewGame();          
        }
    }

    setNewGame() {
        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));
        setTimeout(this.startGame.bind(this), 1000);
    }

}

document.addEventListener("DOMContentLoaded", () => {

    new Memorama();

});









let min = sec = ms = '0' + 0, startTimer;
let aciertos = 0;
let mostrarAciertos = document.getElementById('aciertos');
/*let tiempoRegresivoId = null;
let timer = 30;
let tiempoInicial = 30;*/

const startBtn = document.querySelector(".start"),
    stopBtn = document.querySelector(".stop"),
    resetBtn = document.querySelector(".reset");

    /*startBtn.addEventListener("click", start);*/
    stopBtn.addEventListener("click", stop);
    /*resetBtn.addEventListener("click", reset);*/

    function start(){
       /* startBtn.classList.add("active");*/
        stopBtn.classList.remove("stopActive");
        
      

        startTimer = setInterval(()=>{
            ms++;
            ms = ms < 10 ? "0" + ms : ms;

            if(ms == 100){
                sec++;
                sec = sec < 10 ? "0" + sec : sec;
                ms = "0" + 0;
            }
            if(sec == 60){
                min++;
                min = min < 10 ? "0" + min : min;
                sec = "0" + 0;
                
            }
            if (min == 1){
                clearInterval(startTimer);
                alert("se acabo el tiempo");
            }
            
            putValue();
        },10);
    }

   function stop(){
        /*startBtn.classList.remove("active");*/
        stopBtn.classList.remove("stopActive");
        clearInterval(startTimer);
   } 

   let refresh = document.getElementById('refresh');
   refresh.addEventListener('click', _ => {
               location.reload();
   })

   function reset(){
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    min = sec = ms = "0" + 0;


    
  
    putValue();
   }

   function putValue(){
    document.querySelector('.millisecond').innerHTML = ms;
    document.querySelector('.second').innerHTML = sec;
    document.querySelector('.minute').innerHTML = min;
   }

   








/*function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `tiempo: ${timer}segundos` 
    })
}*/





