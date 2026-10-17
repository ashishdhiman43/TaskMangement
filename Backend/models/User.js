        import mongoose from 'mongoose';

        const userSchema = new mongoose.Schema({
            name:{
                type:String,
                required:false,
            },
            username:{
                type:String,
                required:true,
                unique:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true,
            },
            isVerified:{
                type:Boolean,
                default:false
            },
            verifyToken:{
                type:String
            },
            verifyTokenExpiry:{
                type:Date
            },
            roles:{
                type:String,
                enum:['admin','manager','employee']
            },
            assignedTask:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Task'
            }],
            assignedProject:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Project'
            }]
        });
        const User = mongoose.model('User',userSchema);
        export default User;