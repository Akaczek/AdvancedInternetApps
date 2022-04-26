import React, { useState } from "react"
import Item from "./components/Item"
import AddBox from "./components/AddBox"
import FilterBox from "./components/FilterBox"
import SortBox from "./components/SortBox"
import NavBar from "./components/NavBar"
import data from "./data"

export default function App(){

    const [items, setItems] = useState(data)
    const [counter, setCounter] = useState(items.length)
    const [allItems, setAllItems] = useState(data)

    function compare(prop){
        return function(a,b){
            if(a[prop] > b[prop]){
                return 1
            }else if(a[prop] < b[prop]){
                return -1
            }
            return 0
        }
    }

    function usun(e){
        e.preventDefault()
        let nowa = items.filter(function(item) { 
            return item.id !== parseInt(e.target.value);  
         });
        let newId = counter - 1
        setItems(nowa)
        setAllItems(nowa)
        setCounter(newId)
    }

    function add(e){
        e.preventDefault()
        let nowa = items.map(a => a)
        let newId = counter + 1
        console.log(e.target[0].files[0].name)
        nowa.push({
            "id": newId,
            "img": e.target[0].files[0].name,
            "name": e.target[1].value,
            "desc": e.target[2].value,
            "rating": parseFloat(e.target[3].value)
        })
        e.target[1].value = ""
        e.target[2].value = ""
        e.target[3].value = ""
        setItems(nowa)
        setAllItems(nowa)
        setCounter(newId)
    }

    function filtr(e){
        e.preventDefault()
        let nowa = []
        for(const item in allItems){
            if(allItems[item].name.includes(e.target[0].value)){
                nowa.push(allItems[item])
            }else if(allItems[item].desc.includes(e.target[0].value)){
                nowa.push(allItems[item])
            }
        }
        setItems(nowa)
    }

    function sort(e){
        e.preventDefault()
        let nowa = items.map(a => a)
        nowa.sort(compare(e.target.value))
        setItems(nowa)
    }

    function editRating(e){
        e.preventDefault()
        let newRating = e.target[0].value
        let who = parseInt(e.target[1].value)
        e.target[0].value = ""
        let nowa = []
        let nowaAll = []
        for(const item in items){
            if(items[item].id === who){
                nowa.push({
                    "id": items[item].id,
                    "img": items[item].img,
                    "name": items[item].name,
                    "desc": items[item].desc,
                    "rating": parseFloat(newRating)
                })
            }else{
                nowa.push(items[item])
            }
        }
        for(const item in allItems){
            if(allItems[item].id === who){
                nowaAll.push({
                    "id": allItems[item].id,
                    "img": allItems[item].img,
                    "name": allItems[item].name,
                    "desc": allItems[item].desc,
                    "rating": parseFloat(newRating)
                })
            }else{
                nowaAll.push(allItems[item])
            }
        }
        setItems(nowa)
        setAllItems(nowaAll)
    }

    return (
        <div>
            <NavBar />
            <div className="main">
                <div className="sideBar">
                    <AddBox add = {add}/>
                    <FilterBox filtr = {filtr}/>
                    <SortBox sort = {sort}/>
                </div>
                <div className="content">
                    {items.map(item => (
                        <Item 
                            id={item.id}
                            item={item}
                            click={usun}
                            editRating={editRating}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}