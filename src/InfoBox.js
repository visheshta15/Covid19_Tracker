import React from 'react';
import './InfoBox.css';
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox({active, isBlue, isGreen, isRed, casesType, title, cases, total, ...props}) {

    


    return (
            <Card onClick ={props.onClick} className={`infoBox ${active && 'infobox--active'}`}>
                <CardContent className="infoBox__card">
                    <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                    <h2 className='infoBox__cases'>{`Today ${cases}`}</h2>

                    <Typography className="infoBox__total"color="textSecondary">{`${total} Total`} </Typography>
                </CardContent>
            </Card>
    )
}

export default InfoBox
