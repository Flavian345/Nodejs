const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        index:true,
        require:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true
    },
    seller: {
        type: String
    },
    numri:{
        type:String
    },
    price: {
        type: Number,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    image: {
        type: String,
        require:true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


productSchema.index({name:"text"});
module.exports=mongoose.model("Product",productSchema)