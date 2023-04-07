import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../Hooks/useFetch';

const Detail = () => {
    const {id} = useParams();
    const {data, borders, error, pending, filterBorders, emptyBoundries}= UseFetch("https://restcountries.com/v3.1/alpha/"+id+
    "?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders");
    const navigate = useNavigate();

    useEffect(() => {
        if(data && data.borders){
            console.log("detail");
            filterBorders();
        }
    }, [data]);

    const handleBoundries=(e)=>{
        const id = e.target.id;
        navigate('/detail/'+ id);
        emptyBoundries(id);
    }

    // Picking the last item fomr the nested object
    const handleData=(myObj)=>{ 
        const allValues = getAllValues(myObj);
        const thirdValue = allValues[allValues.length-1];
        return thirdValue;
    }
    // Picking the first item fomr the nested object
    const handleCurrency=(myObj)=>{
        const allValues = getAllValues(myObj);
        const thirdValue = allValues[0];
        return thirdValue;
    }
    // Function to change nested object to array
    function getAllValues(obj) {
        let values = [];
        for (let key in obj) {
          if (typeof obj[key] === "object") {
            values = values.concat(getAllValues(obj[key]));
          } else {
            values.push(obj[key]);
          }
        }
        return values;
    }
        
    const handleBack=()=>{
        navigate("/");
    }

    return (
    <> 
        <div className='row content-header'>
            <button onClick={handleBack} className='btn btn-lg detail-back-button'>&#x2190; &emsp; Back</button>
        </div>
        <div className='row detail-main-content'>
            { error && 
                <div>
                    <h1 className='msg'>{error}</h1>
                </div>
            }
            { pending===true ?
                <div>
                    <h1 className='msg'>PLease wait ......</h1>
                </div>:
                data && 
                <>
                    <div className='col-lg-5'>
                        <img className="image" src={data.flags.svg} alt={data.flags.alt}></img>
                    </div>
                    <div className='col-lg-7'>
                        <h1>{data.name.official}</h1>
                        <div className='row'>
                            <div className='col-lg'>
                                <h2 id="native">Native Name: <span><p>{handleData(data.name.nativeName)}</p></span></h2>
                                <h2>Population: <span><p>{data.population}</p></span></h2>
                                <h2>Region: <span><p>{data.region}</p></span></h2>
                                <h2>Sub Region: <span><p>{data.subregion}</p></span></h2>
                                <h2>Capital: <span><p>{data.capital}</p></span></h2> 
                            </div>
                            <div className='col-lg'>
                                <h2>Top Level Domain: <span><p>{data.tld}</p></span></h2>
                                <h2>Currencies: <span><p>{handleCurrency(data.currencies)}</p></span></h2>
                                <h2>Language: <span><p>{handleData(data.languages)}</p></span></h2>
                            </div>
                        </div>
                        <h2>Border Countries:&emsp; 
                            <span>
                                { data.borders.length!==0 ? borders.map((border, index)=>{
                                    return(
                                        <button onClick={handleBoundries} id={border.cca2} key={index} className='btn btn-sm last-button'>
                                          {border.name.common}  
                                        </button> 
                                    )})
                                :<button className='btn btn-sm last-button'>None</button> }
                            </span>
                        </h2>
                    </div>
                </>
            }
        </div>
    </>
    );
}

export default Detail;
