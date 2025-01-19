import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

	canPlay = false;
	card1 = null;
	card2 = null;
	availableImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	orderForThisRound:any[] = [];
	maxPairNumber = this.availableImages.length;
	foundPairs = 0;
	sec = 0;
	ms = 0;
	min = 0;
	aciertos = 0;
	cards: HTMLImageElement[] = [];
	mostrarAciertos: string = 'Aciertos: 0';
	startTimerRenew:any;
	stopBtn:any;
	millisecond:string = "00";
	second:string = "00";
    minute:string = "00";
    cardsCurrent: { id: number, image: string, flipped: boolean, matched: boolean }[] = [];

	constructor(
		private alertController: AlertController
	){}

    _initializeCards() {
        const images = [
            'assets/images/1.png',
            'assets/images/2.png',
            'assets/images/3.png',
            'assets/images/4.png',
            'assets/images/5.png',
            'assets/images/6.png',
            'assets/images/7.png',
            'assets/images/8.png',
            'assets/images/9.png',
            'assets/images/10.png',
            'assets/images/11.png',
            'assets/images/12.png'
        ];

        // Crear dos copias de cada carta y mezclarlas
        this.cardsCurrent = [...images, ...images]
            .map((image, index) => ({
            id: index,
            image: image,
            flipped: false,
            matched: false
            }))
            .sort(() => Math.random() - 0.5); // Mezclar las cartas
    }

	ngOnInit() {
		
		this.cards = Array.from(document.querySelectorAll(".board-game figure"));
		this._startGame();
	}

	_startGame() {
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
    }

	async _presentAlert( title:string, subtitle:string, message:string){
		const alert = await this.alertController.create({
		  header: title,
		  subHeader: subtitle,
		  message: message,
		  buttons: [
			{
				text: 'OK',
				handler: () => {
				  window.location.reload();
				}
			}
		  ],
		  backdropDismiss: false
		});
	  
		await alert.present();
	}

	refresh(){
		window.location.reload();
	}

	setNewOrder() {
        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );
    }
	
    setImagesInCards() {
		
		for (var key in this.cards) {     
            var card: HTMLImageElement = this.cards[key];
            var image = this.orderForThisRound[key];
            var imgLabel:any = card.children[1].children[0];
			//console.info( "card => ", card, " image => ", image, " imgLabel => ", imgLabel );
			card['dataset']['image'] = image;
            imgLabel['src'] = `assets/images/${image}.png`;
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
        //this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));
        this.start();
    }

    flipCard(e:any) {
        var clickedCard = e.target;
        if (this.canPlay && !clickedCard.classList.contains("opened")) {   
            clickedCard.classList.add("opened");
            this.checkPair( clickedCard['dataset']['image'] );
        }
    }

    checkPair(image:any) {
		//console.info( "image => ", image );
        if (!this.card1) this.card1 = image;
        else this.card2 = image;
		console.info( "Image => ", image, "card1 => ", this.card1, " -- card2 => ", this.card2 );
        if (this.card1 && this.card2) {
            if (this.card1 == this.card2) {
                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300)   
                this.aciertos++;
                this.mostrarAciertos = `Aciertos: ${this.aciertos}`;
				console.info( "ja" );
            }
            else {
                this.canPlay = false;
				console.info( "jo" );
                setTimeout(this.resetOpenedCards.bind(this), 600)
            }
        }          
    }

    resetOpenedCards() { 
        var firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        var secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);
        firstOpened?.classList.remove("opened");
        secondOpened?.classList.remove("opened");
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
            this._presentAlert( "¡Ganaste!", "", "Felicidades, ganaste" );
            this.setNewGame();          
        }
    }

    setNewGame() {
        setTimeout(function() {
			window.location.reload();
		}, 1000);
    }

    start(){
        console.log( "inciamos" );

        this.startTimer();        
    }

    startTimer(){

        this.startTimerRenew = setInterval(()=>{

            this.ms++;
            this.ms = this.ms < 10 ? this.ms : this.ms;

            if(this.ms == 100){
                this.sec++;
                this.sec = this.sec < 10 ? this.sec : this.sec;
                this.ms = 0;
            }
            if(this.sec == 60){
                this.min++;
                this.min = this.min < 10 ? this.min : this.min;
                this.sec = 0;                
            }

            if (this.min == 1){
                clearInterval(this.startTimerRenew);
				this._presentAlert( "Se acabo el tiempo", "", "tuviste " + this.aciertos + " aciertos" );
            }
            
            this.putValue();
        },10);
    }

    stop(){
		clearInterval(this.startTimerRenew);
    }

    putValue(){
        this.millisecond = this.ms < 10 ? "0" + this.ms.toString() : this.ms.toString();
        this.second = this.sec < 10 ? "0" + this.sec.toString() : this.sec.toString();
        this.minute = this.min < 10 ? "0" + this.min.toString() : this.min.toString();
    }
}