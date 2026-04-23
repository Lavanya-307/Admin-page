import React, {useEffect,useState} from "react";
import axios from "axios";

function Guest() {
     const[data,setData]=useState([]);
     const[search,setSearch]=useState('');
    

    useEffect(()=>{
        axios.get("https://api.restful-api.dev/objects")
        .then((res)=>setData(res.data))
        .catch((err)=>console.log("Error fetching guests:", err));
    },[]);

    const filteredData = data.filter(item => 
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1 style={{ fontWeight: 'bold' }}>Guest List</h1>
            </div>
            <div>
            <input 
            type="text"
            placeholder="Search guest..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}/>
            
            <div style={{ marginTop: '20px' }}>
                {filteredData.map((item) => (
                    <div key={item.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        margin: '5px 0',
                        borderRadius: '5px'
                    }}>
                        <h3>{item.name}</h3>
                        <p>ID: {item.id}</p>
                        <p>Color: {item.data?.color || 'N/A'}</p>
                        <p>Capacity: {item.data?.capacity || 'N/A'}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Guest;
