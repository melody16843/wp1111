import express from 'express'
import {genNumber, getTarget} from '../core/getNumber.js'
const router = express.Router()

router.post('/start', (_, res) => {
    genNumber()
    res.json({msg: 'The game has started.'})
})
router.get('/guess', (req, res) => {
    var target = getTarget()
    var number = req.query.number
    console.log(number)
    if (number > 0 && number < 100){
        if(target == number){
            res.json({msg: 'Equal'})
        }
        else if(target < number){
            res.json({msg: 'Smaller'})
        }
        else{
            res.json({msg: 'Larger'})
        }
    }
    else{
        res.status(406).send({msg: 'Not a legal number.'})
    }

})

router.post('/restart', (_, res) => {
    genNumber()
    res.json({msg: 'The game has starget.'})
})

export default router