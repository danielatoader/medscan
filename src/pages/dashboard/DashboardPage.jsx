import React, {useState, useEffect} from 'react';
import logo from '../../logo.svg';
import {Button, Link} from "@material-ui/core";

const DashboardPage = (props) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [patients, setPatients] = useState('p1');
    
    useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
    })
    }, []);

    useEffect(() => {
        fetch('/api/patients').then(res => res.json()).then(data => {
            setPatients(data.patients);
        })
        }, []);  
    
    return (
    <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
        <p>The current time is {currentTime}.</p>
        <Link href={`/`}>
            <Button variant="contained" color="primary">
                Button 1
            </Button>
        </Link>
        { <p>The current patients are {patients}.</p>
        /* <p>The current patients are {patients.map(patient => {
            return <li key={`patient-${patient}`}></li>
        })}.</p> */}
        <Link href={`/`}>
            <Button variant="contained" color="primary">
                Patients
            </Button>
        </Link>
        </header>
    </div>
    );
};

export default DashboardPage;
