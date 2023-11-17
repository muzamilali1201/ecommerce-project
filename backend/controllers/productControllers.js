const Product = require('../DB/ProductModel')
const addProducts = async (req, resp) => {
    const { name, category, price, company, userId } = req.body;
    if (!name || !category || !price || !company) {
        resp.json({message:"All fields are mandatory"});
    }
    else {
        const product = await Product.create({
            name,
            price,
            category,
            company,
            userId
        })
        resp.json({message:"Product added Successfully!"});
    }
}

const getProducts = async (req, resp) => {
    const product = await Product.find();
    if (product) {
        resp.json({product});
    }
    else{
        resp.json({message:"Products not find"})
    }
}

const deleteProduct = async (req,resp)=>{
    const id = req.params.id;
    const delProduct = await Product.deleteOne({_id:id});
    resp.send(delProduct)
}

const getSingleProduct = async (req,resp)=>{
    const prod = await Product.findById({_id:req.params.id});
    if(prod){
        resp.send(prod)
    }
    else{
        resp.send("No record found")
    }
}
const UpdateProduct = async (req,resp)=>{
    const{id} = req.params
    const prod = await Product.findByIdAndUpdate({_id:id},req.body,{new:true})
    resp.send(prod)
}
const SearchUser = async (req,resp)=>{
    const search = await Product.find({
        $or:[
            {name: {$regex : req.params.key}},
            {category: {$regex : req.params.key}},
            {company: {$regex : req.params.key}},

        ]
    })
    resp.send(search)
}



module.exports = { addProducts, getProducts,deleteProduct,getSingleProduct,UpdateProduct,SearchUser }