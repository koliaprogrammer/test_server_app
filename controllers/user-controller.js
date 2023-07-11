const userService = require("../services/user-service");

class UserController {
    async registration(req, res) {
        try {
            const { name, email, password, role, bossId } = req.body;
            const result = await userService.registration(
                name,
                email,
                password,
                role,
                bossId
            );
            if (result.message) {
                res.status(result.status).send(result.message);
            } else {
                res.status(result.status).json(result.user);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async authentication(req, res) {
        try {
            const { email, password } = req.body;
            const result = await userService.authentication(email, password);
            if (result.message) {
                res.status(result.status).send(result.message);
            } else {
                res.status(result.status).json(result.token);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async getUser(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res
                    .status(401)
                    .json({ message: "Missing authorization header" });
            }
            const token = authHeader.split(" ")[1];
            const result = await userService.getUser(token);
            if (result.message) {
                res.status(result.status).send(result.message);
            } else {
                res.status(result.status).json(result.users);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    async changeBoss(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Missing authorization header' });
            }
            const token = authHeader.split(' ')[1];
            const userId = req.params.id;
            const bossId = req.body.boss;
            const result = await userService.changeBoss(token, userId,bossId);
            if (result.message) {
                res.status(result.status).send(result.message);
            }
         else {
            res.status(result.status);
        }
        }
        catch (e) {
            console.log(e);
        }
    }
}
module.exports = new UserController();
