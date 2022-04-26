import React from "react"

export default function FilterBox(props){
    return(
        <div className="filterBox">
            <h1>Filtr</h1>
            <form onSubmit={props.filtr}>
                <input type="text"/>
                <button type="submit">Szukaj</button>
            </form>
        </div>
    )
}