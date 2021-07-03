const express = require("express")
const models = require("../models/index")
const founder = models.founder
const app = express()
const md5 = require("md5")

// auth
const SECRET_KEY_FOUNDER = "branchisesukses"
const authFounder = require("../auth-founder")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", authFounder, async(req,res)=>{
    let result = await founder.findAll()
    res.json(result)
})

app.get("/:id", authFounder, async(req,res)=>{
    let param = {
        id_founder: req.params.id
    }
    let result = await founder.findOne({
        where: param
    })

    res.json(result)
})

app.post("/", async(req,res)=>{
    let data = {
        name_founder: req.body.name_founder,
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp,
        alamat: req.body.alamat,
        nik: req.body.nik,
        npwp: req.body.npwp
    }

    founder.create(data)
    .then(result=>{
        res.json({Message: "Registration Success"})
    })
    .catch(error=>{
        res.json({message:error.message})
    })
})

app.put("/",authFounder, async(req,res)=>{
    let param = await {id_founder:req.body.id_founder}
    let data = await {
        name_founder: req.body.name_founder,
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        telp: req.body.telp,
        alamat: req.body.alamat,
        nik: req.body.nik,
        npwp: req.body.npwp
    }

    founder.update(data, {where:param})
    .then(result => {
        res.json({message: "data has been updated"})
    })
    .catch(error =>{
        res.json({message: error.message})
    })
})

app.delete("/:id",authFounder, async(req,res)=>{
    let param = {id:req.params.id}
    founder.destroy({where:param})
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

    let result = await founder.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY_FOUNDER)

        res.json({
            logged: true,
            data: result,
            role: "founder",
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

