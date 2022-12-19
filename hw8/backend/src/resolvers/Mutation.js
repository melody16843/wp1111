import { v4 as uuidv4 } from 'uuid';


const Mutation = {
  
  createChatBox: async(parent, {name1, name2}, context) => {
    const { pubsub, ChatBoxModel } = context
    const n = [name1, name2].sort()
    let box = await ChatBoxModel.findOne({ name1:n[0], name2:n[1]});

    if (!box){
      box = await new ChatBoxModel({ name1:n[0], name2:n[1]}).save();
      return box;
    }
    else{
      console.log('already used');
      return box
    }

  },
  createMessage: async (parent, { name, to, body }, context) => {
    const { pubsub, ChatBoxModel } = context
    const n = [name, to].sort()
    let chatBox = await ChatBoxModel.findOne({ name1:n[0], name2:n[1]});
    if (!chatBox)
      throw console.error('message send error');
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    pubsub.publish(`chatBox ${n.join('_')}`, {
      message: newMsg,
    });
    return newMsg;
  },
}

export { Mutation as default };
