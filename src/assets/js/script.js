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
        
        this.aciertos = 0;
        this.ms = "00";
        this.sec = "00";
        this.min = "00";
        this.mostrarAciertos = document.getElementById('aciertos');
        this.startTimerRenew;
        this.stopBtn = document.querySelector(".stop");
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
        this.start();
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
                this.aciertos++;
                this.mostrarAciertos.innerHTML = `Aciertos: ${this.aciertos}`; 
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

    start(){
        console.log( "inciamos" );

        this.min = this.sec = this.ms = '0' + 0, this.startTimer(0);        
    }

    startTimer(end){

        this.startTimerRenew = setInterval(()=>{

            this.ms++;
            this.ms = this.ms < 10 ? "0" + this.ms : this.ms;

            if(this.ms == 100){
                this.sec++;
                this.sec = this.sec < 10 ? "0" + this.sec : this.sec;
                this.ms = "0" + 0;
            }
            if(this.sec == 60){
                this.min++;
                this.min = this.min < 10 ? "0" + this.min : this.min;
                this.sec = "0" + 0;                
            }

            if (this.min == 1){
                clearInterval(this.startTimerRenew);
                alert( "Se acabo el tiempo, tuviste " + this.aciertos + " aciertos" );
                window.location.reload();
            }
            
            this.putValue();
        },10);
    }

    stop(){
        clearInterval(this.startTimerRenew);
    }

    putValue(){
        document.querySelector('.millisecond').innerHTML = this.ms;
        document.querySelector('.second').innerHTML = this.sec;
        document.querySelector('.minute').innerHTML = this.min;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    //new Memorama();
    $this = new Memorama();
});

function stop(){
    console.info( "stop()" );
    document.querySelector(".stop").classList.remove("stopActive");
    
    $this.stop();
}