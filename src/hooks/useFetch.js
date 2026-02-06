import { useState,useEffect } from "react";

export default  function useFetch(url){
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        fetch(url)
        .then(res =>{
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data =>{
            if(isMounted){
               setData(data);
                setError(false); 
            }
        })
        .catch(err =>{
            if(isMounted){
                setError(err.message);
            }
        }) 
        return () => {
            isMounted = false;
        };
    },[url]);

    return {data, error};
}

