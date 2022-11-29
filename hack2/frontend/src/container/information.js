/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {
    // console.log(info)
    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}
                {tags.map((e) => {
                    return(<div className='tag' key={e}>{e}</div>)
                })}
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag' key={priceText}>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        const default_time = {
            "Mon":"Closed",
            "Tue":"Closed",
            "Wed":"Closed",
            "Thr":"Closed",
            "Fri":"Closed",
            "Sat":"Closed",
            "Sun":"Closed"
        }
        // console.log(Object.keys(time))
        // console.log(Object.keys(default_time))
        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                {Object.keys(default_time).map((e) => {
                    // console.log(time[e])
                    if(time[e]){
                        // console.log(e)
                        return (
                            <div className='singleDay'>
                                <div className='day'>{e}</div>
                                <div className='time'>{time[e]}</div>
                            </div>
                        )
                    }
                    else{
                        return (
                            <div className='singleDay'>
                                <div className='day'>{e}</div>
                                <div className='time'>{default_time[e]}</div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information