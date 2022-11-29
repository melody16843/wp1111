// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    try{
        const d = await Comment.find({restaurantId:id})
        // console.log(priceFilter)
    // console.log(d)
    res.status(200).send({ message: 'success', contents: d})
    } catch(e){
        res.status(403).send({ message: 'error', contents: [] })
    }

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    // const {name, content, rating, restaurantId } = body
    // console.log(body)
    // try{
    if(body.name && body.content){
        const comment = new Comment({restaurantId:body.restaurantId, content:body.content, name:body.name, rating:body.rating})
        console.log(comment)
        await comment.save()
    }
    // }
    // }catch(e){
    //     throw new Error('name or contents or rating not found')

}
