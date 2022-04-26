import React from "react"

export default function SortBox(props){
    return(
        <div className="sortBox">
            <h1>Sortuj</h1>
            <button id="nameSort" onClick={props.sort} value="name">Imię</button>
            <button id="ratingSort" onClick={props.sort} value="rating">Ocena</button>
            <button id="descSort" onClick={props.sort} value="desc">Opis</button>
        </div>
    )
}