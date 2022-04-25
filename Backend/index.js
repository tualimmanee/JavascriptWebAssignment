

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
        { id: 1, name: 'โคโค่ (Coco)', number: 3, price:'มอลทีส', imageurl:"https://pbs.twimg.com/media/E_j3na3VQAM1TF5?format=jpg&name=900x900"} ,
        { id: 2, name: 'ยางชี (Yangchi)', number: 1,  price:'บิชองฟริเซ่',imageurl:"https://pbs.twimg.com/media/E_j3jxiVkAUpeUP?format=jpg&name=900x900"},
        { id: 3, name: 'โอตึ (Haute)', number: 2, price:'เกรย์ฮาวด์', imageurl:"https://pbs.twimg.com/media/E_j3jx2VQAUbk44?format=jpg&name=900x900"} ,
        { id: 4, name: 'ซีโร่ (Zero)', number: 4, price:'พุดเดิลทอย', imageurl:"https://pbs.twimg.com/media/E_j3jxiVIAQBruF?format=jpg&name=900x900"} ,
        { id: 6, name: 'ตาต้า (Ddadda)', number: 1, price:'ปอมเมอเรเนียน', imageurl:"https://pbs.twimg.com/media/E_j3nZwVIAEI-tZ?format=jpg&name=900x900"} ,
        { id: 7, name: 'คุมะ&ไค (Kuma&Kai)', number: 3, price:'ปอมและค็อกเกอร์', imageurl:"https://pbs.twimg.com/media/E_j4EeMUUAUv226?format=jpg&name=900x900"}
        
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

