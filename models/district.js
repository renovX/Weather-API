const mongoose=require('mongoose')
const districtSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            require:true
        },
        value:
        {
            type:String,
            require:true
        },
        isNum:
        {
            type:Boolean,
            require:true
        }
        
    }
)
module.exports=mongoose.model('districts',districtSchema)
