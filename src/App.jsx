import { useState, useEffect } from 'react'
import CardBody from './Cards.jsx'

import './App.css'

function Header({score, record}) {
  return (
    <header className='header-container'>
      <div>
        <h1><span>Final Fantasy IX</span> Memory Card</h1>
        <p>The images will shuffle after each selection.</p>
        <p>Try to select each image only once!</p>
      </div>
     
      <div className='trackers'>
        <div>Score: {score}</div>
        <div>Record: {record}</div>
      </div>
    </header>
  )
}

function App() {
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [pictureUrls, setPictureUrls] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]); 

  useEffect(() => {
    fetch('https://www.moogleapi.com/api/v1/characters')
    .then(response => response.json())
    .then(data => data.filter(e => e.origin === 'Final Fantasy IX'))
    .then(data => data.filter(e => e.name === "Adelbert" ||
                                   e.name === "Beatrix" ||
                                   e.name === "Freya" ||
                                   e.name === "Eiko" ||
                                   e.name === "Garnet" ||
                                   e.name === "Quina" ||
                                   e.name === "Vivi" ||
                                   e.name === "Cinna" ||
                                   e.name === "Kuja" ||
                                   e.name === "Brahne" ||
                                   e.name === "Zidane"
    ))
    .then(data => data.map(e => e.pictures[0].url))
    .then(data => setPictureUrls(data))
    .catch(error => console.log(error));
  }, [])

  const handleScore = () => { setScore(score + 1) }
  const handleGameOver = () => { 
    setScore(0);
    if (score > record) {
      setRecord(score);
    }
  }

  const handleClick = (id) => {
    if(selectedCards.includes(id)) {
        handleGameOver();
        setSelectedCards([]);
    } else {
        handleScore();
        const updateCardsList = [...selectedCards, id];
        setSelectedCards(updateCardsList);
    }
  }

  return (
    <>
      <Header score={score} record={record} />
      {pictureUrls && <CardBody key       = {selectedCards.length} 
                                pictures  = {pictureUrls} 
                                click     = {(id) => handleClick(id)}/>}
    </>
  )
}

export default App
