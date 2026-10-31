import { FaBars } from "react-icons/fa";
import logo from "../assets/crochetlogo-width.png"
import  links  from "./links";
import { useEffect, useRef, useState } from "react";
import SocialBar from './SocialBar';

const Navbar = () => {
//useState per il toggle
const [show, setShow]= useState(false)
//USEREF e USEEFFECT per regolare altezza del menu hamburger automaticamente
const linkContainerRef = useRef<HTMLDivElement>(null)
const linkListRef = useRef<HTMLDivElement>(null)

//use effect per gestire quando e come cambia l'altezze
useEffect(()=>{
    //alteza attuale della nostra lista
    const linkListHeight = linkListRef.current?.getBoundingClientRect().height
    //ora devo passare l'altezza
    if (linkContainerRef.current){
    if(show){
        linkContainerRef.current.style.height = `${linkListHeight}px`
    }else{
        linkContainerRef.current.style.height = `0px`
    }
}
},[show])

  return (
  <nav className="nav">
    <header className="nav-header">
        <div className="nav-brand">
            <img src={logo} alt="logo" className="nav-logo"/>
            <h4 className="h4-titolo">My Crochet</h4>
        </div>
        <button className="btn nav-toggler" onClick={()=> setShow(!show)}>
            <FaBars className="nav-icon"/>
        </button>
    </header>
    <div className={`${show ? "links-container show" :"links-container"}`}>
        <ul className="nav-links">
            {links.map((el)=> {
                return(
                    <li key={el.id}>
                        <a style={{ color: "rgb(88, 3, 94)"}} href={el.url}>
                            {el.text}
                        </a>
                    </li>
                )
            })}
        </ul>
    </div>
    <div className="social-links">
            <SocialBar/>
        </div>
  </nav>
)}

export default Navbar;