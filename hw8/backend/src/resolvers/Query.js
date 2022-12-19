
const Query = {
  chatbox: async (parent, { name1, name2 }, context) => {
    const { pubsub, ChatBoxModel } = context
    const n = [name1, name2].sort()
    let box = await ChatBoxModel.findOne({ name1:n[0], name2:n[1]});
    if (!box)
      throw console.error('not found');
    return box;
  },
};
export default Query;

