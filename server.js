const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const customer = require("./router/endpoint-customer")
const founder = require("./router/endpoint-founder")
const franchise = require("./router/endpoint-franchise")


app.use("/branchise/customer", customer)
app.use("/branchise/founder", founder)
app.use("/branchise/franchise", franchise)



app.listen(8100, ()=> {
    console.log("success")
})

// {
//     "email": "agnes@gmail",
//     "username": "agnes",
//     "password": "123",
//     "name": "agnes juliana",
//     "city": "blitar"
// }

// {
//     "name_founder": "juliana",
//     "email": "juliana@gmail",
//     "username": "juliana",
//     "password": "123",
//     "telp": "01453166413",
//     "alamat": "dihati yang lapang",
//     "nik": "1245373123",
//     "npwp": "1245437532345"
// }