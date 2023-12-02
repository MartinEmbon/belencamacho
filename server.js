const express = require("express")
const nodemailer = require("nodemailer")
const path = require('path')
const app=express()

app.use(express.static('public'))
app.use(express.json())

const PORT = 3000

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));

})

app.post('/',(req,res)=>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"martinembon9@gmail.com",
            pass:"yuhh tvbo qqav hsqq"
        }
    })
    const mailOptions = {
        from:req.body.email,
        to:"martinembon9@gmail.com",
        subject:`Mensaje de ${req.body.email}`,
        text:req.body.message
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
            res.send('error')
        }
        else{
            console.log("Email enviado " + info.response)
            res.send('success')
        }
    })
})

app.listen(PORT,()=>{
    console.log("Server running")
})