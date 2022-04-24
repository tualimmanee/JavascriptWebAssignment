

const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users
let student = db.student

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let pets = {
    list: [
        { id: 1, name: 'ที่กลิ้งขน', number: 35, price: 150, imageurl:"https://th-live-01.slatic.net/p/de795d9eca9d686a055d31db24ed638c.jpg"} ,
        { id: 2, name: 'อาหารสุนัข', number: 3,  price: 300, imageurl:"https://static.bigc.co.th/media/catalog/product/cache/2/image/17f82f742ffe127f42dca9de82fb58b1/8/8/8853301130158_9.jpg"},
        { id: 3, name: 'อาหารแมว', number: 35, price: 250, imageurl:"https://cf.shopee.co.th/file/eb5d8b5a6702e184438b89684f553d17"} ,
        { id: 4, name: 'ขนมสุนัข', number: 35, price: 99, imageurl:"https://cf.shopee.co.th/file/bf75904136ecbe94c6cd98dfb7b0f1d6"} ,
        { id: 5, name: 'ขนมแมว', number: 35, price: 65, imageurl:"https://backend.tops.co.th/media/catalog/product/8/8/8850477013698_31-05-2021.jpg"} ,
    ]
}
let income = 0

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

;

    router.route('/pets')
    .get((req, res) => res.json(pets.list))
    .post((req, res) => {
        console.log(req.body)
        let newPet = {}
        newPet.id = (pets.list.length) ? pets.list[pets.list.length - 1].id + 1 : 1
        newPet.name = req.body.name
        newPet.number = req.body.number
        newPet.price = req.body.price
        newPet.imageurl = req.body.imageurl
        pets = { "list": [...pets.list, newPet] }
        res.json(pets.list)
    })

router.route('/pets/:pet_id')
    .get((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        res.json(pets.list[id])
    })
    .put((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        pets.list[id].id = req.body.id
        pets.list[id].name = req.body.name
        pets.list[id].number = req.body.number
        pets.list[id].price = req.body.price
        pets.list[id].imageurl = req.body.imageurl
        res.json(pets.list)
    })
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        pets.list = pets.list.filter(item => +item.id !== +pet_id)
        res.json(pets.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:pet_id')
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        console.log('PetID: ', pet_id, 'ID: ', id)
        if (id !== -1) {
            income += pets.list[id].price
            pets.list = pets.list.filter(item => +item.id !== +pet_id)
            res.json(pets.list)
        }
        else {
            res.send('Not found')

        }
    })

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.put('/repets/:pet_id',
     async (req, res) => {   
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        if (pets.list[id].number > 0)
            pets.list[id].number--
            res.json(req.pets)
    
    })
    
router.put('/addpet/:pet_id',
    async (req, res) => {     
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        pets.list[id].number++
            res.json(req.pets)
    })


router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

