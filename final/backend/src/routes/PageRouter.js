import { Router } from "express";
import Page from "../models/Page.js";
import User from '../models/User.js'
import bodyParser from 'body-parser';
import dotenv from 'dotenv-defaults';
const stytch = require("stytch");
const router = Router();
router.use(bodyParser.json())
dotenv.config();

//let email;

const clientTest = {
    project_id: 'project-test-86532b75-cfe6-43a9-8584-6470b5b474fb',
    secret: process.env.SECRETT,
    env: stytch.envs.test,
};
const clientLive = {
    project_id: 'project-live-bb992f55-b84b-4342-bbb0-e37f9f7557a3',
    secret: process.env.SECRET,
    env: stytch.envs.live,
};
const postTest =
{
    login_magic_link_url: 'http://localhost:3000/auth',
    signup_magic_link_url: 'http://localhost:3000/auth',
}
const postLive =
{
    login_magic_link_url: 'https://haveanicetrip-2023.up.railway.app/auth',
    signup_magic_link_url: 'https://haveanicetrip-2023.up.railway.app/auth'
};
const clientParams =
    process.env.NODE_ENV === "production" ? clientLive : clientTest;

const postParams =
    process.env.NODE_ENV === "production" ? postLive : postTest;

// console.log(clientParams)
const client = new stytch.Client(clientParams/*{
    // run locally =>
    // project_id: 'project-test-86532b75-cfe6-43a9-8584-6470b5b474fb',
    // secret: process.env.SECRET,
    // env: stytch.envs.test,

    //project_id: 'project-live-bb992f55-b84b-4342-bbb0-e37f9f7557a3',
    //secret: process.env.SECRET,
    //env: stytch.envs.live,
 }*/);
console.log(client);


router.post("/login", async (req, res) => {
    try {
        let email = req.body.email;
        console.log('email: ', email);
        const userData = await User.findOne({ name: email.split('@')[0] })

        if (!userData) {

            const newUser = new User({ name: email.split('@')[0] })
            await newUser.save()
        }
        const params =
        {
            email,
            ...postParams,
            //login_magic_link_url: 'https://wpfinal-production-2596.up.railway.app/auth',
            //signup_magic_link_url: 'https://wpfinal-production-2596.up.railway.app/auth',
            //login_magic_link_url: 'http://localhost:3000/auth',
            //signup_magic_link_url: 'http://localhost:3000/auth',
        };
        console.log(params);
        const response = await client.magicLinks.email.loginOrCreate(params);
        res.json(response);
    } catch (err) {
        console.log(err);
        res.json(err);
    }

});

router.post("/auth", async (req, res) => {
    try {
        const token = req.body.token;
        const sessionToken = await client.magicLinks.authenticate(
            token, {
            session_duration_minutes: 30,
        }
        );
        console.log(sessionToken);
        res.json(sessionToken);
    } catch (err) {
        res.json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        const session_id = req.body.session_id;
        const resp = await client.sessions.revoke({ session_id });

        console.log(resp);
        res.json(resp);
    } catch (err) {
        res.json(err);
    }
})



//search get
router.post('/search', async (req, res) => {
    Page.createIndexes({ name: "text" })
    const searchInput = req.body.searchInput
    const filter = req.body.filter
    // console.log(searchInput)
    // console.log(filter)
    //search 
    const alldata = await Page.find()
    const searchdata = alldata.filter((e) => {
        if (e.name.match(searchInput)) {
            // console.log(e.data.metaDescription)
            return e
        }
    })
    const data = searchdata.filter((e) => {
        const region = filter.north.concat(filter.middle, filter.east, filter.south)
        const price = filter.price
        const days = filter.days
        var isregion = false
        var isprice = false
        var isdays = false

        if (region.length != 0) {

            region.map((s) => {
                if (e.filter.includes(s)) {
                    isregion = true
                }
                return

            })
        }
        else {
            isregion = true
        }

        if (price.length != 0) {
            price.map((s) => {
                if (e.filter.includes(s)) {
                    isprice = true
                }
                return

            })
        }
        else {
            isprice = true
        }

        if (days.length != 0) {
            days.map((s) => {
                if (e.filter.includes(s)) {
                    isdays = true
                }
                return

            })
        }
        else {
            isdays = true
        }

        // console.log(e)

        if (isdays & isprice & isregion) {
            return e
        }


    })

    // console.log(data)
    if (data) {
        try {
            res.send({ data: data })
            return;
        }
        catch (e) {
            res.send({ message: `update error`, card: false });
            throw new Error("search error: " + e);
        }
    }
    else {
        res.send({ data: 'not found' })
    }
})

//login get
//sent name and id of article to client
router.post('/getuser', async (req, res) => {
    const { user } = req.body
    // console.log(user !='')
    if (user != ''){
    const userData = await User.findOne({ name: user })
    console.log('find user '+user)
    console.log(userData)

    if (userData) {

        const page = userData.page == [] ? [] : await Promise.all(userData.page.map(async (e) => {
            const data = await Page.findById(e)
            console.log(data)
            if (data) return { name: data.name, id: data._id }
            else return { name: '', id: '' }
        }))
        // console.log(page)
        const favorite = userData.favorite == [] ? [] : await Promise.all(userData.favorite.map(async (e) => {
            const data = await Page.findById(e)
            if (data) return { name: data.name, id: data._id }
            else return { name: '', id: '' }
        }))

        try {
            // console.log(userData)
            // console.log(page)
            // console.log(favorite)
            // console.log(page)
            res.send({ page: page, favorite: favorite })
            return;
        }
        catch (e) {
            res.send({ message: `update error`, card: false });
            throw new Error("navbar update error: " + e);
        }
    }
    else {
        try {
            res.send({ page: [], favorite: [] })
        }
        catch (e) {
            res.send({ message: `update error`, card: false });
            throw new Error("navbar update error: " + e);
        }
    }

    }


})
//getpage get
//sent whole article to client
router.post('/article', async (req, res) => {
    const id = req.body.id
    const data = await Page.findById(id);
    console.log('find page', data)
    if (!data) {
        // throw new Error('article fetch error' + e)
        res.send({data:'please update your page'})
    }
    else {
        try {
            console.log("data=", data)
            res.send({ data: data })
            return
        } catch (e) {
            throw new Error('article send error' + e)
        }
    }
})
//editpage post
router.post('/editpage', async (req, res) => {
    const { id, data, post } = req.body
    // console.log("req.body", req.body)
    // const editData = Page.findByIdAndUpdate(id, { data: data , post:post})
    await Page.findByIdAndUpdate(id, { data: data, post: post })
    const editData = await Page.findById(id);
    console.log('edit page', editData)
    if (!editData) {
        throw new Error('article fetch error' + e)
    }
    else {
        try {
            console.log("editData=", editData)
            res.send(editData)
            return
        } catch (e) {
            throw new Error('article send error' + e)
        }
    }

})

//newpage post
router.post('/newpage', async (req, res) => {
    // console.log("in /newpage",req.body) //data sent from client

    // after click saving button, call '/newpage'
    // const {data} = req.body.params
    const data = req.body.data
    const creator = req.body.creator
    const post = req.body.post
    const owner = req.body.data.owner.split(' ')
    // console.log("in PageRouter=", post)
    // console.log("id", id)

    const name = data.title;
    const filter = data.tagId;
    console.log(filter)

    // const owner = data.user; ?
    const newpage = new Page({ name: name, filter: filter, data: data, post: post, creator: creator, owner: owner })
    await newpage.save()
    var msg = 'save success'
    await Promise.all(owner.map(async (e) => {
        const result = await User.findOneAndUpdate({ name: e }, { '$push': { page: newpage._id } })
        console.log('add new page to '+e)
        // console.log(result)
        if (!result) {
            msg = 'some owner have not signed up'
        }
    }))

    await User.findOneAndUpdate({ name: creator }, { '$push': { page: newpage._id } })
    try {
        res.status(200).send({ newpage: newpage, msg: msg })
        console.log("in PageRouter newpage ", newpage)
        return;
    }
    catch (e) {
        res.send({ message: `update error`, card: false });
        throw new Error("scorecard update error: " + e);
    }

}
)
//delete page
router.post('/deletepage', async (req, res) => {
    const id = req.body.id
    if (id){
        try {
            const deleted = await Page.findByIdAndDelete(id)
            console.log('delete page:', deleted)
            await User.findOneAndUpdate({ name: deleted.creator }, { "$pull": { page: deleted._id, favorite: deleted._id } })
            Promise.all(deleted.owner.map(async (e) => {
                console.log('delete page from:'+e)
                const test = await User.findOneAndUpdate({ name: e }, { "$pull": { page: deleted._id, favorite: deleted._id } })
                console.log(test)
                return 
                
            }))
            res.status(200).send({ data: 'success' })
        }
        catch (e) {
            res.send({ message: `update error`, card: false });
            throw new Error("favorite update error: " + e);
        }
    }
    else{
        console.log('can not find page')
    }
})


//set favorite
router.post('/favorite', async (req, res) => {
    const id = req.body.id
    const user = req.body.user
    const checked = req.body.checked

    if (checked) {
        await User.findOneAndUpdate({ name: user }, { '$push': { favorite: id } })
        console.log('add to '+user+' favorite')
    }
    else {
        await User.findOneAndUpdate({ name: user }, { '$pull': { favorite: id } })
        console.log('delete from '+user+' favorite')
    }

    try {
        res.status(200).send({ data: 'success' })
    }
    catch (e) {
        res.send({ message: `update error`, card: false });
        throw new Error("favorite update error: " + e);
    }
})


router.post('/account', async (req, res) => {
    const id = req.body.id
    const data = req.body.data

    const d = await Page.findByIdAndUpdate(id, { account: data })
    if (d) {
        try {
            res.status(200).send({ data: 'success' })
        }
        catch (e) {
            res.send({ message: `update error`, card: false });
            throw new Error("account update error: " + e);
        }
    }
})

router.post("/get-account", async (req, res) => {
    const id = req.body.params
    const data = await Page.findById(id)
    // console.log(req.body)
    // console.log(data.account)

    try {
        if (!data) {
            res.status(200).send({ initData: data.account, msg: 'init error' })
        } else {
            res.status(200).send({ initData: data.account, msg: 'init success' })
        }
    }
    catch (e) {
        res.send({ message: `update error`, card: false });
        throw new Error("get-account error: " + e);
    }
})









export default router;
