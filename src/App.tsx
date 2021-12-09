import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [clusters, setClusters] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/compute_clusters', {})
    .then((res) => res.json())
    .then((res) => {
      setClusters(res);
    })
  }, []);  

  return (
        <>
          <>
            <Button variant="success" onClick={event =>  window.location.href='http://localhost:5000/scan'}>Scan</Button>{' '}
            <Button variant="secondary">Notes</Button>{' '}
            <Button variant="primary">Regular medication</Button>{' '}
            <Button variant="warning">LASA medication</Button>{' '}         
            <Button variant="light">Info</Button>
          </>
          <ul>
            {clusters.map((cluster) => (
              <>    
                {Object.entries(cluster).map(([key,value])=>(
                    <ul>
                      <b>{key} :</b>
                      {Object.values(String(value).split(",")).map((meds) => (
                        <li>{String(meds)}</li>
                      ))}
                    </ul>
                  )
                )}
              </>
            ))}
          </ul>
        </>
  );
}

export default App;
