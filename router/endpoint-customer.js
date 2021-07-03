const express = require("express")
const models = require("../models/index")
const customer = models.customer
const app = express()
const md5 = require("md5")

// auth
const SECRET_KEY_CUSTOMER = "ayobranchise"
const authCustomer = require("../auth-customer")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", authCustomer, async(req,res)=>{
    let result = await customer.findAll()
    res.json(result)
})

app.get("/:id", authCustomer, async(req,res)=>{
    let param = {
        id_customer: req.params.id
    }
    let result = await customer.findOne({
        where: param
    })

    res.json(result)
})

app.post("/", async(req,res)=>{
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        city: req.body.city
    }

    customer.create(data)
    .then(result=>{
        res.json({Message: "Registration Success"})
    })
    .catch(error=>{
        res.json({message:error.message})
    })
})

app.put("/",authCustomer, async(req,res)=>{
    let param = await {id_customer:req.body.id_customer}
    let data = await {
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        city: req.body.city
    }

    customer.update(data, {where:param})
    .then(result => {
        res.json({message: "data has been updated"})
    })
    .catch(error =>{
        res.json({message: error.message})
    })
})

app.delete("/:id_customer",authCustomer, async(req,res)=>{
    let param = {id_customer:req.params.id_customer}
    customer.destroy({where:param})
    .then(result=>{
        res.json({message: "data has been deleted"})
    })
    .catch(error=>{
        res.json({message: error.message})
    })
})



// login
app.post("/login", async (req, res) => {
    let param = {
        email: req.body.email,
        password: md5(req.body.password)
    }

    let result = await customer.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY_CUSTOMER)

        res.json({
            logged: true,
            data: result,
            role: "customer",
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "invalid username or password"
        })
    }
})

module.exports = app

