import React, {useEffect, useState} from 'react';
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else handleShow(false)
        })
        return ()=>{
            window.removeEventListener("scroll")
        };
    }, [])

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <img 
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/800px-Netflix_2014_logo.svg.png" 
            alt="Netflix Logo"
            />           
            <img 
            className="nav_avatar"
            src="https://cdn.vox-cdn.com/thumbor/p-B0MNlW-Bvr3wNtMOtlA_BqqUI=/0x0:1080x1080/1200x0/filters:focal(0x0:1080x1080):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/18272865/witcher_poster_crop.jpg"
            alt="Netflix Profile Logo"
            />
        </div>
    )
}

export default Nav;

