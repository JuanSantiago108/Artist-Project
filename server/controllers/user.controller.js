const User = require('./../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            res
                .cookie("userToken", userToken, { httpOnly: true })
                .json({ msg: "success", user: user });
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
}



module.exports.index = (req, res) => {
    User.find()
        .then(users => {
            const userList = users.map((user) => {
                return ({ _id: user._id, userName: user.userName, email: user.email, imageList: user.imageList, instagram: user.instagram })
            })
            res.json(userList)
        })
        .catch(err => res.json(err))
}



module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        return res.status;
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);


    if (!correctPassword) {
        return res.status;
    }

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res
        .cookie("userToken", userToken, { httpOnly: true })
        .json({ msg: "success!" });
}


module.exports.logout = (req, res) => {
    res.clearCookie('userToken')
    res.sendStatus(200)
}


module.exports.getUser = (req, res) => {
    // const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
    User.findOne({ _id: req.params.id })
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
}



module.exports.updateImageList = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
    User.findOneAndUpdate(
        { _id: decodedJwt.payload.id },
        { $push: { imageList: req.body.image } },
        {new : true}
    )
    .then(user => res.json(user))
    .catch(err => console.log(err))
}



module.exports.deleteObject = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}