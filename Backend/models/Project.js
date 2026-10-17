import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    ProjectName:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    assignTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    creationDate:{
        type:Date,
        default:Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;