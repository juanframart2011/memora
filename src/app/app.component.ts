import { Component } from '@angular/core';

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
	orderForThisRound = null;
	cards = [];
	maxPairNumber = 0;
	foundPairs = 0;
	sec = "";
	ms = 0;
	min = "";
	aciertos = 0;

	constructor(){}

	refresh(){

		window.location.reload();
	}

	stop(){
		//clearInterval(startTimerRenew);
	}
}