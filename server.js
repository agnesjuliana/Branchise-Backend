const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const customer = require("./router/endpoint-customer")
const founder = require("./router/endpoint-founder")

app.use("/branchise/customer", customer)
app.use("/branchise/founder", founder)


app.listen(8000, ()=> {
    console.log("success")
})

// {
//     "email": "agnes@gmail",
//     "username": "agnes",
//     "password": "123",
//     "name": "agnes juliana",
//     "city": "blitar"
// }