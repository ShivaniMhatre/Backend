import mongoose,{Schema} from 'mongoose';

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerify:{
        type:Boolean,
        default:false    
    },
    ratings:{
        type:[Number],
        enum:[1,1.5,2,2.5,3,3.5,4,4.5,5]
    },
    comments:{
        type:[Object],
    }
})


export default mongoose.model("Product",productSchema)
