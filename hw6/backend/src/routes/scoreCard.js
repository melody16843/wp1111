import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import bodyParser from 'body-parser';
const router = Router();
router.use(bodyParser.json())



const deleteDB = async () => {
try {
await ScoreCard.deleteMany({});
console.log("Database deleted");
return
} catch (e) { 

    throw new Error("Database deletion failed"); 
}
};

// const findScoreCard = 

router.delete("/cards", async(req, res) => {
    deleteDB();
    res.json({message:'database cleared'})
});

router.post("/card", async(req, res) => {

    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score

    const exist_name = await ScoreCard.findOne({ name:name, subject:subject});
    // console.log(exist_name)
    if (exist_name){
        try{
            const update = await ScoreCard.findOneAndUpdate({name:name, subjedt:subject}, {score:score});
            console.log(`update ${name}, ${subject}`);
            res.send({message:`update ${name}, ${subject}`, card: true})
            return;
        }
        catch(e) {
            res.send({message:`update error`, card:false});
            throw new Error("scorecard update error: " + e);
        }
    }
    else{
        try {
        const newScoreCard = new ScoreCard({ name, subject, score });
        console.log("Created user", newScoreCard);
        newScoreCard.save();
        res.send({message:`create ${name}, ${subject}`, card: true})
        return;
        } catch (e) { 
            res.send({message:`create error`, card:false});
            throw new Error("scorecard creation error: " + e); 
        }
    }
    
});
router.get("/cards", async(req, res) => {
    const querytype = req.query.type;
    const target = req.query.queryString;

    if (querytype == 'name'){
        var exist_name = await ScoreCard.find({name:target});
        var name_list = exist_name.map(e => {return `found card with name (${e.name}, ${e.subject}, ${e.score})`});
        console.log(name_list)
        if(name_list.length != 0) {res.send({messages:name_list, message: 'true'})}
        else {res.send({messages:false, message: `name ${target} not found`})};
    }
    else if(querytype == 'subject'){
        var exist_subject = await ScoreCard.find({subject:target});
        var subject_list = exist_subject.map(e => {return `found card with subject (${e.name}, ${e.subject}, ${e.score})`});

        if (subject_list.length !== 0) {res.send({messages:subject_list, message: 'true'})}
        else {res.send({messages: false, message: `subject ${target} not found`})};
    }
    else{
        throw new Error("querytype error:" + e);
    }


});
export default router;