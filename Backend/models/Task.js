import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false,
    },
    body:{
        type:String,
        require:false
    },
    assignTask:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        required:false,
        enum:['notStarted', 'inprogress','completed']
    },
    progress:{
        type:Number,
        default:0
    },
    taskPriority:{
        type:String,
        enum:['low','medium','high']
    },
    duedate:{
        type:Date,
        default: Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
const task = mongoose.model('Task',TaskSchema);
export default task;
