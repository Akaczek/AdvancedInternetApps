import React from "react"

export default function AddBox(props){
    return(
        <div className="addBox">
            <h1>Dodawanie</h1>
            <form onSubmit={props.add}>
                <label htmlFor="fimg">Zdjęcie</label>
                <input type="file" id="fimg" name="img" accept="image/*"/>
                <label htmlFor="fname">Imię:</label>
                <input type="text" id="fname" name="name"/>
                <label htmlFor="fdesc">Opis:</label>
                <input type="text" id="fdesc" name="desc"/>
                <label htmlFor="frating">Ocena:</label>
                <input type="text" id="frating" name="rating"/>
                <button type="submit">Dodaj</button>
            </form>
        </div>
    )
}