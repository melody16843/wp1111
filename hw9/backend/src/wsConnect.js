import { ChatBoxModel, MessageModel, UserModel } from "./models/chatbox.js"
// import Message from "./models/messages";

const makeName = (name, to) => { return [name, to].sort().join('_') }

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const broadcastMessage = ( wss, data, status) => {
    // for (client in ws){
    //     sendData(data, client);
    //     sendStatus(status, client);
    // }
    // console.log(wss)
    wss.forEach((client) => {

        sendData(data, client);
        sendStatus(status, client);
        // console.log('success')
    })
    
}
const chatBoxes = {}; //current active boxes

const validateUser = async (name) => {
    console.log('finding...' + name)
    const existing = await UserModel.findOne({ name })
    if (existing !== null) return existing
    else return false
    
}

const validateChatBox = async (name, users) => {
    let box = await ChatBoxModel.findOne({ name:name });
    if (box === null){
        console.log('create new box')
        box = await new ChatBoxModel({ name:name, users: users }).save();
        let update_user = await UserModel.findByIdAndUpdate(users[0], {"$push":{chatBoxes:box._id}});
        let update_to =  await UserModel.findByIdAndUpdate(users[1], {"$push":{chatBoxes:box._id}});
        
    }
    // console.log(box)
    const msg = await box.populate
    (["users", { path: 'messages', populate: 'sender' }]);
    // console.log(msg)
    return msg;
};

export default {
    // initData: (ws) => {
    //     MessageModel.find().sort({ created_at: -1 }).limit(100)
    //         .exec((err, res) => {
    //             if (err) throw err;
    //             // initialize app with existing messages
    //             sendData(["init", res], ws);
    //         });
    // },
    onMessage: (wss, ws) => (
        // console.log(ws)
        async (byteString) => {
            // console.log(byteString)
            const { data } = byteString
            const {task, payload} = JSON.parse(data)

            switch (task) {
                case 'init': {
                    const {name} = payload
                    // console.log(name)
                    const validuser = await validateUser(name);
                    if(!validuser) {
                        console.log('create new user')
                        const user = await new UserModel({name}).save();
                    }
                    break
                }
                case 'message': {
                    const { user, body, to } = payload
                    console.log(payload)
                    const validuser = await validateUser(user);
                    const validto = await validateUser(to);
                    // const message = new Message({ name, body })
                    if (validuser && validto){
                        //save message shema
                        const chatBoxName = makeName(user, to)
                        const box = await validateChatBox(chatBoxName, [validuser._id, validto._id]);
                        const message = new MessageModel({ chatBox:box._id, sender:validuser._id, body:body })

                        try {
                            await message.save()

                        } catch (e) {
                            throw new Error("Message DB save error:" + e)
                        }
                        const update = await ChatBoxModel.findByIdAndUpdate(box._id, {"$push":{messages:message._id}})
                        // const check = await validateChatBox(chatBoxName, [validuser._id, validto._id]);
                        //update chatboxes
                        broadcastMessage(
                            chatBoxes[chatBoxName], ['output', {name:user, body:body}],
                            {
                                type: 'message success',
                                msg: 'Message sent'
                            }
                        )
                    }
                    else {
                        throw new Error('user not found')
                    }
                    break
                }
                case 'clear': {
                    // MessageModel.deleteMany({}, () => {
                    //     sendData(['cleared'], ws)
                    //     sendStatus
                    //         ({ type: 'info', msg: 'Message cache cleared.' }, ws)
                    // })
                    // break
                }
                case 'chat': {
                    const { name, to } = payload;
                    const validuser = await validateUser(name);
                    const validto = await validateUser(to);

                    if (validto && validuser) {
                        if (ws.box !== "" && chatBoxes[ws.box]) //delete old chat boxes since user switch to other box
                            chatBoxes[ws.box].delete(ws);

                        const chatBoxName = makeName(name, to)//update chat box list 
                        ws.box = chatBoxName
                        if (!chatBoxes[chatBoxName]) {
                            chatBoxes[chatBoxName] = new Set();
                        }
                        chatBoxes[chatBoxName].add(ws);
                        // const oldMessage = validateChatBox(chatBoxName, [name, to]);
                        const box = await validateChatBox(chatBoxName, [validuser._id, validto._id]); //get messages from db
                        // const oldMessage = chatBoxes[chatBoxName].messages
                        // console.log(box.messages)
                        console.log(chatBoxes)
                        broadcastMessage(chatBoxes[chatBoxName], ['chat', box.messages], 
                            {
                                type: 'chat success',
                                msg: 'add new chat box'
                            }
                        ); //send message to client
                    }
                    else {
                        throw new Error('user not found')
                    }

                }
                case 'validate': {
                    const {name} = payload
                    const valid = UserModel.findOne({name:name})
                    if (!valid) return false
                    else return true
                }
            }
        }
    ),
    close:(ws) => {
        console.log(ws.box)
        if (ws.box !== "" && chatBoxes[ws.box]) //delete old chat boxes since user switch to other box
            chatBoxes[ws.box].delete(ws);

    }
}