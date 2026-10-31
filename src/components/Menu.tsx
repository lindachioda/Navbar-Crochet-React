
const url = "https://api-crochet.onrender.com/data";

import React, { useState } from "react";
import data from "../dataFake";
import Crochet from "./Crochet";
import axios from "axios"
import type { CrochetData } from "../type";


const Menu = () => {
    const [prodotti, setProdotti] = useState(data)
    //seleziona prodotti da filtrare
    const [selected, setSelected] = useState(0)
    console.log(prodotti)
    //filtra prodotti per categorie di "prodotti"
    const [filterProducts, setFilterProducts] = useState(prodotti)
    //loading state
    const [loading, setLoading] = useState(true)
    //error state
    const [error, setError] = useState(false)
    //categorie
    const [categorie, setCategorie] = React.useState<string[]>([]) //TIPIZZA

    //creare array di categorie button
    //const categorie:string[] = Array.from(new Set(prodotti.map((el)=> el.categoria)))

    //crea categoria ALL:
    //categorie.unshift("all")

    //crea filtraProdotti per filtrare prodotti in base al button di diverse categorie
    const filtraProdotti = (categoria: string, id: number)=>{
        setSelected(id)
        if(categoria === "all"){
            setFilterProducts(prodotti)
        }else{
            setFilterProducts(prodotti.filter((el)=> (el.categoria === categoria ? el : ""))) //se è la categoria corrispondente manda il dato altrimenti non mandarlo!
        }
    }


    //FETCH
    React.useEffect(()=>{
        (async()=>{
            setLoading(true)
            setError(false)

            //try/catch
            try{ //tipizza data
                const response = await axios.get<CrochetData[]>(url)
                console.log(response.data)

                setProdotti(response.data)
                setFilterProducts(response.data)

                //categorie array:
                const nuoveCategorie = Array.from(new Set(response.data.map((el)=> el.categoria)))
                nuoveCategorie.unshift("all")

                setCategorie(nuoveCategorie)

                setLoading(false)
                setError(false)

            }catch(error){
                console.log(error)
                setLoading(false)
                setError(true)
            }
        })()
    }, [])

  return <div className="container">
    <h4 style= {{ textAlign:"center", textTransform:"uppercase"}}>Le Nostre Creazioni</h4>
    {
        !loading && !error ? (
    <>
    <div className="lista-categorie">
    {
        categorie.map((categoria, id)=>{
            return <button key={id} onClick={()=> filtraProdotti(categoria, id)} className={`btn btn-selector ${id === selected && "active"}`}>
                {categoria}
            </button>
        })
    }
    </div>
    <div className="vetrina">
        {filterProducts.map((el)=>(
            <Crochet key={el.id} {...el}/>
        ))}
    </div>
    </>
        ) : 
            !loading && error ? (<h4>Error...</h4>
        ) : (
            <h4>Loading</h4>
        )}
  </div>
}

export default Menu;