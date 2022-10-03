import { Component, OnInit } from '@angular/core';
import { CongratsDialogComponent } from '../congrats-dialog/congrats-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  myCards: any[] = [];
  files: any[];
  cards: any = [];
  viewCards: any = [];
  startingMinutes=10
  public time: number = 120
  constructor(
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    setInterval(() => this.updateCoundDown(), 1000);
    this.files = [
      {
        name: 'jack_of_hearts.svg',
        checked: false
      },
      {
        name: 'king_of_clubs.svg',
        checked: false
      },
      {
        name: 'queen_of_clubs.svg',
        checked: false
      },
      {
        name: 'jack_of_hearts.svg',
        checked: false
      },
      {
        name: 'jack_of_spades.svg',
        checked: false
      },
      {
        name: 'queen_of_clubs.svg',
        checked: false
      },
      {
        name: 'king_of_hearts.svg',
        checked: false
      },
      {
        name: 'king_of_diamonds.svg',
        checked: false
      },
      {
        name: 'queen_of_diamonds.svg',
        checked: false
      },
      {
        name: 'queen_of_diamonds.svg',
        checked: false
      },
      {
        name: 'king_of_spades.svg',
        checked: false
      },
      {
        name: 'king_of_clubs.svg',
        checked: false
      },
      {
        name: 'king_of_spades.svg',
        checked: false
      },
      {
        name: 'king_of_hearts.svg',
        checked: false
      },
      {
        name: 'jack_of_spades.svg',
        checked: false
      },
      {
        name: 'king_of_diamonds.svg',
        checked: false
      }
    ]
  }


  public updateCoundDown() {
    if (this.time < 0) {
      return;
    }
    else {
      const coundDownElement = document.getElementById('countDown')
      const minute = Math.floor(this.time/60)
      let seconds = this.time % 60;
      coundDownElement.innerHTML = `${minute}:${seconds}`
      this.time--
    }
  }



  public flipCard(fileName:string, index: number) {
    const viewIndex = 1+(2*index)    
    const myCard = document.querySelectorAll('.card');
    const viewCard = document.querySelectorAll('.view');
    let imgTag = document.querySelectorAll(".back-view img");
    // @ts-ignore: Object is possibly 'null'.
    imgTag.src = `../assets/images/${fileName}`;

    if (myCard != null) {
      myCard[index].setAttribute("style", "backface-visibility: visible")

    }
    if(viewCard!= null) {
      viewCard[viewIndex].setAttribute("style", "backface-visibility: visible")
    }
    if(this.myCards.length<2) {
      this.myCards.push(fileName)
      this.cards.push(index)
    }
    if(this.myCards.length==2) {
      const isMatch = this.myCards[0]==this.myCards[1]
      if(!isMatch) {
        setTimeout(() => {
          this.cards.map((i: number) => {
            myCard[i].setAttribute("style", "backface-visibility: hidden")
            viewCard[1+(2*i)].setAttribute("style", "backface-visibility: hidden")
          })
          this.myCards = []
          this.cards = []
        }, 500)
      }
      else{
        this.cards.map(i=> {
          this.files[i].checked = true
        })
        this.myCards = []
        this.cards = []
      }
    }

    const filteredFiles = this.files.filter(el=> !el.checked)
    if(filteredFiles.length==0){
      this.dialog.open(CongratsDialogComponent);
    }
  }
}
