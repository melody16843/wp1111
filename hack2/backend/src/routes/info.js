// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import mongoose from 'mongoose'
import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/
    const db = mongoose.connection.db;
    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    
    try{
        var d
        // console.log(priceFilter)
        if( !priceFilter&& !mealFilter&& !typeFilter){
            d = await Info.find({}).sort(sortBy)
        }
        else{
            d = await Info.find({}).sort(sortBy)
            if(priceFilter){
                d = await Info.find({}).sort(sortBy)
                d = d.filter(item => {
                    console.log(item.price)
                    if(priceFilter.indexOf(item.price.toString()) !== -1) return item
                })
                // console.log(d)
            }
            // console.log(d)
            if(mealFilter){
                d = d.filter(item => {
                    // console.log(item)
                    const valid = item.tag.map((tag) => {
                        if (mealFilter.indexOf(tag) !== -1 ){
                            // console.log(tag)
                            return true
                        }
                    })
                    if (valid.indexOf(true) !== -1){
                        return item
                    }
                })
                // console.log(d)
            }
            if(typeFilter){
                d = d.filter(item => {
                    // console.log(item)
                    const valid = item.tag.map((tag) => {
                        if (typeFilter.indexOf(tag) !== -1 ){
                            // console.log(tag)
                            return true
                        }
                    })
                    if (valid.indexOf(true) !== -1){
                        return item
                    }
                })
                // console.log(d)
            }

            // console.log(d)
        }
    // console.log(d)
    res.status(200).send({ message: 'success', contents: d})
    } catch(e){
        res.status(403).send({ message: 'error', contents: 'restaurent found error' })
    }

        
    

    // TODO Part I-3-a: find the information to all restaurants
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    try{
        const d = await Info.find({id:id})
        // console.log(priceFilter)
    // console.log(d)
    res.status(200).send({ message: 'success', contents: d})
    } catch(e){
        res.status(403).send({ message: 'error', contents: [] })
    }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}