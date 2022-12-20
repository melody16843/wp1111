const Subscription = {
  itemCreated: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('ITEM_CREATED');
    },
  },

  itemUpdated: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('ITEM_UPDATED');
    },
  },
  // TODO 6.2 Define the itemDeleted subscription resolver
  itemDeleted:{
    subscribe: (parent, args, {pubSub}) => {
      console.log('delete')
      // console.log(pubSub.subscribe('ITEM_DELETED'))
      
      return pubSub.subscribe('ITEM_DELETED');
      
      // return 0
    },
  }
  // TODO 6.2 End
};

export default Subscription;
