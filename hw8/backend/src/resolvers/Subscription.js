
const Subcription = {
  message:{
    subscribe: (parent, {name, to}, {pubsub}) => {
      const boxname = [name, to].sort().join('_')
      console.log(boxname)
      return pubsub.subscribe(`chatBox ${boxname}`);
    },
    // resolve:(payload) => payload
  }
};

export { Subcription as default };
