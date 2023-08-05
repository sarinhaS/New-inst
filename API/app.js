//imports

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//config json response
app.use(express.json())

// liberar acesso de outros domínios/portas
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//models
const User = require('./models/User')


// principal rota
app.get('/', (req, res) => {
    res.send();
}
)

//rota privada
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id
    //checa se o user existe
    const user = await User.findById(id, '-password')
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = process.env.secret
        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" })
    }
}

// registro (post pq retorna dados)
app.post('/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    //validações
    if (!name) { //se n tiver nome --
        return res.status(422).json({ msg: "O nome é obrigatório!" })
    }
    if (!email) { //se n tiver email
        return res.status(422).json({ msg: "O e-mail é obrigatório!" })
    }
    if (!password) { //se n tiver senha
        return res.status(422).json({ msg: "A senha é obrigatória!" })
    }
    if (!confirmpassword) { //se n tiver a confirmação de senha
        return res.status(422).json({ msg: "A confirmação de senha é obrigatória!" })
    }
    if (password !== confirmpassword) { //se senha for diferente da confirmação de senha
        return res.status(422).json({ msg: "As senhas não se conferem!" })
    }

    //vê se o usuário já existe ---  vê se já tem esse email
    const userExists = await User.findOne({ email: email })

    //se tem algo nessa variável
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail." })
    }

    //criar senha --- cria "dificuldade"
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //criar usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente mais tarde!" })
    }

})

//Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body

    //validações 
    if (!email) { //se n tiver email
        return res.status(422).json({ msg: "O e-mail é obrigatório!" })
    }
    if (!password) { //se n tiver senha
        return res.status(422).json({ msg: "A senha é obrigatória!" })
    }

    // vê se o usuário já existe ---  vê se já tem esse email
    const user = await User.findOne({ email: email})

    //se tem algo nessa variável //se n tem user..
    if(!user) { 
        return res.status(404).json({msg: "Usuário não encontrado!"})
    }
    //ve se as senhas conferem
    
    const checkPassword = await bcrypt.compare(password, user.password) 

    if(!checkPassword) { 
       return res.status(422).json({msg: "Senha inválida!"})
    }

    if (email !== 'teste@teste.com' || password !== '123') {
        res.status(422).json({ msg: "Senha inválida!" })
    }

    try {
        const secret = process.env.secret
        const token = jwt.sign({
            // id: user.id,
            id: 1
        }, secret,)

        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token: token })

    } catch (err) {
        console.log(err)

        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" })

    }
})

//credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
     `mongodb+srv://${dbUser}:${dbPassword}@project.yvef6nc.mongodb.net/`
).then(() => {
    app.listen(3000)
    console.log('conectou ao banco!!')
}).catch((err) => console.log(err))

