import { useEffect, useState } from "react"
import './App.css'

function Card({ picture, onClick }) {
    return (
        <div className  =   "card" 
             style      =   {{ background: `url(${picture})`, backgroundSize: 'cover'}} 
             onClick    =   {onClick} ></div>
    )
}

export default function CardBody({ pictures, click }) {
    const [cards, setCards] = useState([{id: 0, picture: pictures[0]}, 
                                        {id: 1, picture: pictures[1]}, 
                                        {id: 2, picture: pictures[2]}, 
                                        {id: 3, picture: pictures[3]}, 
                                        {id: 4, picture: pictures[4]}, 
                                        {id: 5, picture: pictures[5]}, 
                                        {id: 6, picture: pictures[6]}, 
                                        {id: 7, picture: pictures[7]},
                                        {id: 8, picture: pictures[8]},
                                        {id: 9, picture: pictures[9]}
                                    ]);   

    useEffect(()=> {
        const newCards = [... cards];
        for (let i = newCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
        }
        setCards(newCards);
    }, [])

    return (
        <div className="card-container"> 
        {cards.map(card => <Card    key     =   {card.id} 
                                    picture =   {card.picture} 
                                    onClick =   {() => click(card.id)}
                                    />)}
        </div>
    )
}