import { useState,useEffect } from "react";

export default  function useFetch(url){
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(()=>{fetch(url)
    .then(res =>{
        if(!res.ok){
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data =>{
        setData(data);
        setError(false);
    })
    .catch(err =>{
        setError(err.message);
    }) 
    },[url]);

    return {data, error};
}

