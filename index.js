/************************************
 *      CARD CREATION
 ***********************************/
// holds the icons of the cards for the game
const CARD_ICONS = ["🎃", "💀", "👻", "🕷️", "🧙", "🦉", "🦇", "🧛"];

//generates a deck of two of each cards
function generateCards() {
  let deck = [];
  CARD_ICONS.forEach((content, ind) => {
    deck.push({ id: `card-${ind}-a`, content, isFlipped: false, matched: false });
    deck.push({
      id: `card-${ind}-b`,
      content,
      isFlipped: false,
      matched: false,
    });
  });
  return shuffle(deck);
}

// shuffles an array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


// creates the DOM elements for the cards
function showCards() {
  deck.forEach((card) => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = card.id;
    cardDiv.addEventListener("click", () => handleCardClick(card));
    document.getElementById("gameBoard").appendChild(cardDiv);
  });
}


// initializes the game
let deck = generateCards();
showCards();

/************************************
 *    GAME LOGIC
 ***********************************/

// handles the click on a card
function handleCardClick(card) {
  flipCard(card);  
  checkMatches();
  checkWin()
}


//mini helper function to return array of only the flipped and non matched cards
let flippedCards = () => deck.filter((card) => card.isFlipped && !card.matched);


// flips a card
function flipCard(card) {
  //get the flipped cards that are not matched yet
  let flipped = flippedCards();

  //we only allow up to 2 flipped cards
  if (flipped.length < 2) {
    //modify card property to show it is now flipped
    card.isFlipped = true;
    //modify card content and class in DOM to show the image
    const selectedCard = document.getElementById(card.id)
    selectedCard.classList.add("flipped");
    selectedCard.innerHTML = card.content;
  }
}

// marks any flipped cards as matched if they match
function checkMatches() {
  //get the flipped cards that are not matched yet
  let flipped = flippedCards();

  if (flipped.length===2)
    if(flipped[0].content === flipped[1].content) {
    //mark cards as "matched"
    flipped.forEach((card) => (card.matched = true));
    } else {
      //if no match, flip back the unmatched cards
      setTimeout(() => {
        flipBack();
      }, 1000);
    }
  }

// sets all flipped cards back to false (except for the matched ones)
function flipBack() {
  flippedCards().forEach((card) => {
    //mark card object as not flipped
    card.isFlipped = false;
    //remove image and class from card in DOM
    const selectedCard = document.getElementById(card.id);
    selectedCard.classList.remove("flipped");
    selectedCard.innerHTML = "";
  });
}

// shows a message if the game is over
function checkWin() {
  const matched = deck.every((card) => card.matched);
  if (matched) {
    document.getElementById("message").innerHTML = "YOU WIN!"
    //TODO: reset
  }
}





