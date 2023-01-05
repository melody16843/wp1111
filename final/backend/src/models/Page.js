import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const PageSchema = new Schema({
    name: String, //title
    owner: [String],
    filter:[String],
    creator: String,
    // data: [{ 
    //     id:String,
    //     type:String,
    //     data:{
    //         post:{
    //             time:Number,
    //             blocks:[],
    //             version:String,
    //         },
    //         postExcerpt:String,
    //         tagId:[],
    //         metaDescription:String,
    //         jsonData:String,
    //         // Text: String,
    //         // level: Number,
    //         // style: String,
    //         // items :[String],
    //     }
    //  }],

     data:{
        title:String,
        post:{
            time:Number,
            blocks:[],
            version:String,
        },
        postExcerpt:String,
        tagId:[],
        metaDescription:String,
        owner: String
    },

    post:{
            time:Number,
            blocks:[],
            version:String,
        },

     account:[{
            date: String,
            cost: Number,
            whoPaid: String,
            tags: [String],
            key: String,
     }]
});
const Page = mongoose.model('Page', PageSchema);
export default Page;



