import React, {useState, useEffect} from 'react';
import "../styles/Navbar.css";

const Navbar = () => {
    const [dark, setDark] = useState();

    useEffect(() => {
        let theme
        theme= getCurrentTheme();
        setDark(theme)
        document.addEventListener("DOMContentLoaded", ()=> loadTheme(theme));
    },[]);

    const getCurrentTheme=()=>{
        const theme= window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        return theme
    }

    const loadTheme=(themes)=>{
        const root= document.querySelector(":root");
        root.setAttribute("color-scheme", themes);
        if(themes==="dark"){
            setDark(true);
        }else{
            setDark(false);
        }
    }

    const handleClick=()=>{
        setDark(prev => !prev);
        changeColor();
    }

    const changeColor=()=>{
        let themes
        if(dark===true){
            themes= "light";
        }else{
            themes = "dark";
        }
        loadTheme(themes);
    }

    return (
    <nav className="navbar">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Where in the world ?</a>
            <div onClick={handleClick} className='ms-auto mode'>
                {   dark === true ? 
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="white" 
                    className="bi bi-moon-fill icon" viewBox="0 0 16 16">
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                    </svg> :
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
                    className="bi bi-moon icon" viewBox="0 0 16 16">
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                    </svg>
                }
                <button>Dark Mode</button>
            </div>
        </div>
    </nav>);
}

export default Navbar;
