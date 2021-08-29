import mongoose from 'mongoose'
const whatsUpSchema = mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    email:String
})
export default mongoose.model('messagecontents',whatsUpSchema)