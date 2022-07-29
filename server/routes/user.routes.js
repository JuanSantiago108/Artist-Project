const UserController = require('../controllers/user.controller')
const {authenticate} = require('../config/jwt.config')


module.exports = app =>{
    app.get(`/api/allUsers`, authenticate, UserController.index)
    app.get(`/api/logout`, UserController.logout)
    app.get(`/api/getUser/:id`, UserController.getUser)
    app.post(`/api/register`, UserController.register)
    app.post(`/api/login`, UserController.login)
    app.put(`/api/add`, UserController.updateImageList)
    app.delete(`/api/delete/:id`,UserController.deleteObject)
}
