import generatePassword from "password-generator";
import passwordGenerator from 'password-generator';

export default {
    async StorageEvent(req, res) {
        const {name, email} = req.body;

        const user = {
            name,
            email, password: passwordGenerator(15, false)
        };

        return res.json(user);
    }
}