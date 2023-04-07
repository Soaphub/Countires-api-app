import { useState, useEffect } from "react";

const UseFetch = (url) => {
	const [data, setdata] = useState();
    const [borders, setBorder]= useState([]);
	const [pending, isPending]= useState(true);
	const [error, setError]= useState(null); 

	useEffect(() => {
		setError(null);
		isPending(true);
		getData(url);
	}, [url]);

	// To fetch data for the home page 
	const getData= async()=>{
		setBorder([]);
		try {	
			const resposne= await fetch(url);
			const jsonData = await resposne.json();
			if(!resposne.ok){
				throw("Could not fetch data from the server");
			}
			setdata(jsonData);
			isPending(false);
		} catch (error) {
			isPending(false);
			setError(error);
		}
	}

	const filterBorders=()=>{
		data.borders.forEach(border => {
			getBorders(border);
		});
	}

	// To fetch actual name for border countries
    const getBorders=async(id)=>{
		try {
			const resposne= await fetch("https://restcountries.com/v3.1/alpha/"+id+"?fields=name,cca2");
			const jsonData = await resposne.json();
			if(!resposne.ok){
				throw("Could not fetch boundries data from the server");
			}
			setBorder((prevBorders) => [...prevBorders, jsonData]);
		} catch (error) {
			setError(error);
		}
    }

	// To fetch search data
	const searchData= async(search)=>{
		try {
			setError(null);
			isPending(true);
			const resposne= await fetch("https://restcountries.com/v3.1/name/"+search+
			"?fields=flags,name,population,region,cca2,capital");
			const jsonData = await resposne.json();
			if(!resposne.ok){
				throw("No data found for your search");
			}
			setdata(jsonData);
			isPending(false);
			
		} catch (error) {
			isPending(false);
			setError(error);
		}
	}

	// To fetch filtered region
	const filterData= async(region)=>{
		try {
			let url;
			setError(null);
			isPending(true);
			if(region==="all"){
				url= "https://restcountries.com/v3.1/"+region+"?fields=flags,name,population,region,cca2,capital";
			}else{
				url= "https://restcountries.com/v3.1/region/"+region+"?fields=flags,name,population,region,cca2,capital";
			}
			const resposne= await fetch(url);
			const jsonData = await resposne.json();
			if(!resposne.ok){
				throw("No data found for your search");
			}
			setdata(jsonData);
			isPending(false);

		} catch (error) {
			isPending(false);
			setError(error);
		}
	}

	const emptyBoundries=(id)=>{
		setBorder([]);
	}

    return {data, borders, pending, error, 
		filterBorders, emptyBoundries, searchData, filterData};
}

export default UseFetch;
