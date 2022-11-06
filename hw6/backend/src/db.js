import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';

dotenv.config();

mongoose
.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then((res) => console.log("mongo db connection created"))
.catch(() => console.log('connection fail'));



export default {
connect: () => { 
    const db = mongoose.connection
    // console.log(process.env.MONGO_URL)
}
}