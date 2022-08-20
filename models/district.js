const fs=require('fs')
const path=require('../util/path')
module.exports=class District
{
    constructor(name,value,isNum)
    {
        this.name=name;
        this.value=value;
        this.isNum=isNum;
    }
    static findAll(cb)
    {
        fs.readFile(path,(err,fileContent)=>
        {
            if(err)console.log(err)
            const list=JSON.parse(fileContent);
            cb(list)
        })
    }
    static findByName(name,cb)
    {
        fs.readFile(path,(err,fileContent)=>
        {
            if(err)console.log(err)
            const list=JSON.parse(fileContent);
            const district=list.find(d=>{return d.name==name})
            
            cb(district)
        })
    }
    static addDistrict(district)
    {
        fs.readFile(path,(err,fileContent)=>
        {
            if(err)console.log(err)
            const list=JSON.parse(fileContent);
            list.push(district)
            fs.writeFile(path,JSON.stringify(list),err=>
            {
                if(err)console.log(err)
                else
                console.log("Write succesful")
            })
        })
    }
}
