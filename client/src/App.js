import { useState, useEffect } from "react";
import './App.css';
import SingleCard from "./components/SingleCard";

const cardImages = [
  { "src": "img/bulldog.png", matched: false },

  { "src": "img/corgi.png", matched: false },

  { "src": "img/poodle.png", matched: false },

  { "src": "img/french-bulldog.png", matched: false },

  { "src": "img/shih-tzu.png", matched: false },

  { "src": "img/dachsund.png", matched: false },

  // { "src": "img/golden-retriever.png", matched: false },
  { "src": "img/dalmation.png", matched: false },

  { "src": "img/shiba-inu.png", matched: false },
]



function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) => {
    // Stop the user from being able to click the first card twice
    if (card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true, }
            } else {
              return card
            }
          })
        })
        resetTurn();

      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>MemoMatch</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;