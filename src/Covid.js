import React,{useState, useEffect} from 'react';
import './Covid.css';
import {Link} from 'react-router-dom';
import {FormControl, Select, MenuItem , Card,CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import {prettyPrintStat} from './util';
function Covid() {

    const [countries, setCountries] = useState([]);
    const [countrytop, setCountrytop] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 26.846708, lng: 80.946159 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState('cases')

    useEffect(()=>{
        //use async function ->  because to send a request to a server , and wait for it and do something with info
        const getCountriesData = async() =>{
            await fetch('https://disease.sh/v3/covid-19/countries') 
            .then((response)=>response.json()) //.then--> when it comes back with the response, then take only the json data
            .then((data)=>{
                const countries = data.map((country)=>(
                    {
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }
                ))

                // const sortedData = sortData(data)
                setCountries(countries)
                setTableData(data)
                setMapCountries(data)
                
            })           
        }
        getCountriesData()
    },[]);
    // console.log(tableData)

    useEffect(()=>{
             fetch('https://disease.sh/v3/covid-19/all') 
            .then((response)=>response.json()) 
            .then((data)=>{setCountryInfo(data) })           
    },[]);


    //----------------onchange

    const onCountryChange = async (e)=>{
        const countryCode = e.target.value;
        // console.log(countryCode)
        setCountrytop(countryCode)

        const url = countryCode === 'worldwide' ? 
        'https://disease.sh/v3/covid-19/all' : 
        `https://disease.sh/v3/covid-19/countries/${countryCode} `
        
        // making onCountryChange function as --> async
        // go to the url, and once u get the response, turn it into json
        // the time it become json---> it become data
        await fetch(url)  
        .then((response)=> response.json())
        .then((data)=>{
            setCountryInfo(data)
            setCountrytop(countryCode)
            console.log(data)
            setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            setMapZoom(4)
        })
    }
// console.log(tableData)
    return (
        <div className="covidapp">
            <div className="app__left">
                {/* header */}
                {/* title - select input dropdown  */}
                <div className="app__header">
                    <div className="app__heading">
                        <Link to="/"  style={{ textDecoration: 'none', color: '#e74c3c' }}>
                            <h1  style={{ paddingLeft: 13 }}>COVID-19 TRACKER</h1>
                        </Link>

                    </div>
                    {/* <h1>COVID-19 TRACKER</h1> */}
                    <FormControl className="app__dropdown">
                        {/* assign same value to "value" element of "Select" and "MenuItems" */}
                        <Select 
                            variant="outlined" 
                            value={countrytop}
                            onChange={onCountryChange}  >
                            <MenuItem value="worldwide">WorldWide</MenuItem>
                            {
                                countries.map((country)=>(
                                    <MenuItem value={country.value} >{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                {/* infoBox */}
                <div className="app__stats">
                    <InfoBox 
                        onClick ={(e)=> setCasesType('cases')}
                        active={casesType ==='cases'}
                        casesType={casesType}
                        title="Coronavirus Active Cases"
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={prettyPrintStat(countryInfo.active)}
                    />
                    <InfoBox 
                        onClick ={(e)=> setCasesType('recovered')}
                        active={casesType ==='recovered'}
                        casesType={casesType}
                        title="Recovered"
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={prettyPrintStat(countryInfo.recovered)}
                    />
                    <InfoBox 
                        onClick ={(e)=> setCasesType('deaths')}
                        active={casesType ==='deaths'}
                        casesType={casesType}
                        title="Deaths"
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={prettyPrintStat(countryInfo.deaths)}
                    />

                </div>
                {/* Map */}
                <Map 
                    className="app__map"
                    casesType={casesType}
                    countries = {mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            
            </div>
            <Card className="app__right" >
                <CardContent>
                    <h3>Live  Cases By Country</h3>
                    {/* table */}
                    <Table countries={tableData}/>

                    <h3 className="app__right_graphTitle">WorldWide new {casesType}</h3>
                    {/* graph */}
                    <LineGraph casesType={casesType}/>
                </CardContent>
            </Card>


        </div>

    )
}

export default Covid
