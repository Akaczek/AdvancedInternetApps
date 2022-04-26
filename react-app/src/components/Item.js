import React from "react"

export default function Item(props){

    return (
        <div className="itemBox">
            <img src={`../images/${props.item.img}`} alt="zdjęcie psa" />
            <div className="description">
                <h1>{props.item.name}</h1>
                <p><img id="star" src="../images/star.png" alt="ikona gwiazdy"/>{props.item.rating}</p>
                <p>{props.item.desc}</p>
                <form onSubmit={props.editRating}>
                    <input type="number" step="0.1" min="0.0" max="5.0"/>
                    <input type="hidden" value={props.id}/>
                    <button type="submit">Edytuj ocenę</button>
                </form>
            </div>
            <button id="minus" onClick={props.click} value={props.id}>-</button>
        </div>
    )
}