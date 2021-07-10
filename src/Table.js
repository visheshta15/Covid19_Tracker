import React from 'react'
import './Table.css';
import numeral from 'numeral';


function Table({countries}) {
    console.log(countries)
    return (
        <div className="table">            
            {countries
            .sort((a,b)=> a.cases > b.cases ? -1 : 1)
            .map((country)=>(
                <tr>
                    <td><img src={country.countryInfo.flag} alt={country.countryInfo.flag}/></td>
                    <td>{country.country}</td>
                    <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;
