import React, { useEffect, useState } from 'react';
import "../styles/Content.css"
import { useNavigate } from 'react-router-dom';
import UseFetch from "../Hooks/useFetch";


const Home = () => {
	const {data, pending, error, searchData, filterData} = 
    UseFetch("https://restcountries.com/v3.1/lang/spanish?fields=flags,name,population,region,cca2,capital");
    const navigate = useNavigate();

	const [search, setSearch]= useState("");

    useEffect(()=>{
        const filter= sessionStorage.getItem("name");
        if(search){
            searchData(search);
        }else if(filter){
            document.getElementById('select').value = filter;
            filterData(filter);
        }
    },[search])

    const handleClick=(e)=>{
        const id = e.target.id;
        navigate('/detail/'+ id);
    }

    const handleSeacrh=(e)=>{
        const id=e.target.value
        setSearch(id);
    }

    const handleFilter=(e)=>{
        const region= e.target.value;
        sessionStorage.setItem("name", region);
        filterData(region);
    }

    return (
        <>
            {/* Content Header  */}
            <div className='row content-header'>
                <div className='row home-header'>
                    {/* Search tab */}
                    <div className='col col-lg-5'>
                        <form className="d-flex" role="search">
                            <div className="input-group input-group-lg">
                                <span className='input-group-text'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    className="bi bi-search" viewBox="0 0 16 16">
                                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg> 
                                </span>
                                <input onChange={handleSeacrh} className="form-control" type="search" placeholder="Search a country..." 
                                aria-label="Search" value={search}/>  
                            </div>
                        </form>
                    </div>
                    {/* Filter tab */}
                    <div className='col col-lg-3'>
                        <form>
                            <select id="select" onChange={handleFilter} className="form-select form-select" aria-label="Default select example">
                                <option value="" hidden>Filter by Region</option>
                                <option value="all">All</option>
                                <option value="Africa">Africa</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className='row'>
                { (error && search!=="") &&
                    <div className='message'>
                        <h1>{error}</h1>
                    </div>
                }
                { pending===true &&
                    <div className='message'>
                        <h1>PLease wait ......</h1>
                    </div>   
                }
                { data && data.map((data, index)=>{
                    return(
                    <div id={data.cca2} onClick={handleClick} className='col-lg home-col' key={index}>
                        <div id={data.cca2} className="card home-cards" style={{width: "18rem"}}>
                            <img id={data.cca2} className="home-flags" src={data.flags.png} alt={data.flags.alt}></img>
                            <div id={data.cca2} className="card-body mt-3 mb-3">
                              <h1 id={data.cca2} className="card-title mb-3">{data.name.official}</h1>
                              <h2 id={data.cca2}>Population: <span><p>{data.population}</p></span></h2>
                              <h2 id={data.cca2}>Region: <span><p>{data.region}</p></span></h2>
                              <h2 id={data.cca2}>Capital: <span><p>{data.capital}</p></span></h2>
                            </div>
                        </div> 
                    </div>
                    )}) 
                }
            </div>
        </>
    );
}

export default Home;
