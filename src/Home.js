import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css';
import { MenuItem } from '@material-ui/core';


function Home() {

    return (
        <div className="home__outer">
            <div className="home">

                <img className="home__image1"/>
                <img className="home__image2"/>
                <img className="home__image3"/>
                <img className="home__image4"/>

                <div className="home__center">
                    <Link to="/covidpage"  style={{ textDecoration: 'none', color: '#3498db' }}>
                        <h1 className="home__link" >Check Covid-19 Situation Here...</h1>
                    </Link>
                </div>

                <h4 className="home__dataInfo">COVID-19 data sourced from Worldometers, updated every 10 minutes</h4>
                <h4 className="home__creator" >Made by Visheshta</h4>
            </div>
        </div>
    )
}

export default Home
