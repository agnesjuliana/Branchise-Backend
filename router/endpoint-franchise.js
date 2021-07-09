const express = require("express")
const models = require("../models/index")
const franchise = models.franchise
const app = express()
const md5 = require("md5")

// auth
// const SECRET_KEY_FOUNDER = "branchisesukses"
// const authFounder = require("../auth-founder")
// const jwt = require("jsonwebtoken")

const multer = require("multer")
const path = require("path")
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: (req, file, cal) => {
        cal(null, "./img/img_franchise")
    },
    filename: (req, file, cal) => {
        cal(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage })

app.get("/", async(req,res)=>{
    let result = await franchise.findAll()
    res.json(result)
})

// app.get("/:id", async(req,res)=>{
//     let param = {
//         id_founder: req.params.id
//     }
//     let result = await founder.findOne({
//         where: param
//     })

//     res.json(result)
// })

app.post("/", upload.single("image"), async(req,res)=>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            image:req.file.filename
        }

        franchise.create(data)
            .then(result => {
                res.json({ message: "data has been inserted" })
            })
            .catch(error => {
                res.json({ message: error.message })
            })
    }
})

// app.put("/", async(req,res)=>{
//     let param = await {id_founder:req.body.id_founder}
//     let data = await {
//         name_founder: req.body.name_founder,
//         email: req.body.email,
//         username: req.body.username,
//         password: md5(req.body.password),
//         name: req.body.name,
//         telp: req.body.telp,
//         alamat: req.body.alamat,
//         nik: req.body.nik,
//         npwp: req.body.npwp
//     }

//     founder.update(data, {where:param})
//     .then(result => {
//         res.json({message: "data has been updated"})
//     })
//     .catch(error =>{
//         res.json({message: error.message})
//     })
// })

app.delete("/:id", async (req, res) => {
    let param = { id_franchise: req.params.id }
    let result = await siswa.findOne({ where: param })
    let oldImageName = result.image

    let dir = path.join(__dirname, "../img/img_franchise", oldImageName)
    fs.unlink(dir, err => console.log(err))

    franchise.destroy({ where: param })
        .then(result => {
            res.json({ message: "data has been destroyed" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})



module.exports = app

