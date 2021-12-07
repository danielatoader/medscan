import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [clusters, setClusters] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/compute_clusters", {})
    .then((res) => res.json())
    .then((res) => {
      setClusters(res);
    })
  }, []);  

  return (
        <>
          <ul>
            {clusters.map((cluster) => (
              <li>
                Result
                {Object.entries(cluster).map(([key,value])=>(
                    <ul>
                      <b>{key}</b> : 
                      {Object.values(String(value).split(" ")).map((meds) => (
                        <li>{String(meds)}</li>
                      ))}
                    </ul>
                  )
                )}
              </li>
            ))}
          </ul>
        </>
  );
}

export default App;
