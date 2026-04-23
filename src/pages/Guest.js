import React, {useEffect,useState} from "react";
import axios from "axios";

function Guest() {
     const[data,setData]=useState([]);
     const[search,setSearch]=useState('');
    

    useEffect(()=>{
        axios.get("https://api.restful-api.dev/objects")
        .then((res)=>setData(res.data.users))
        .catch((err)=>console.log("Error fetching guests:", err));
    },[]);


    return (
        <div>
            <div className="page-header">
                <h1 style={{ fontWeight: 'bold' }}>Guest List</h1>
            </div>
            <div>
            <input 
            type="text"
            placeholder="Search guest..."
            onChange={(e)=>setSearch(e.target.value)}/>
            
          
            </div>
        </div>
    );
}

export default Guest;
