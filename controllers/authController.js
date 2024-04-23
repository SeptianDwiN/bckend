const db = require("../database/models");
const Users = db.Users;
const Blacklist = db.Blacklist;
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
require("dotenv").config();

const register = async (input, res) => {
    try {
        // input diambil dari hasil validasi route
        // sehingga di controller sudah bersih tanpa logika pengecekan lagi
        const save = await Users.create(input);
        res.json(save).status(200);
    } catch (error) {
        res.json(error).status(422);
    }
};

const authentication = async (req, res) => {
    try {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        const cekUsername = await Users.findOne({ where: { username: username } });
        const fetchResult = cekUsername.dataValues;
        const verify = passwordHash.verify(password, fetchResult.password);

        // Cek apakah password yang diinput sama dengan yang ada di database
        // dan cocokkan menggunakan hash
        if (verify !== true) {
            res.json({ msg: 'Password incorrect !' }).status(422);
        } else {
            // Isi value token kita mau apa aja
            const userToken = {
                id: fetchResult.id,
                username: fetchResult.username,
                role: fetchResult.role
            };

            // Set token dengan value usertoken
            // set secret key token kita untuk nanti validasi
            // set expires token nya
            // lalu kasih balikan berupa token jika login sukses
            jwt.sign({ userToken }, process.env.JWT_KEY, {
                expiresIn: '365d' // set expire token
            }, (err, token) => {
                if (err) {
                    console.error('Error in generating token:', err);
                    return res.status(500).json({ msg: 'Failed to generate token' });
                }
                res.json({ token: token, role: fetchResult.role }).status(200);
            });
        }
    } catch (error) {
        // kondisi jika username atau password salah
        res.json({ msg: `username or password not match ${error}` }).status(422);
    }
};

const getLoginById = async (req, res) => {
    try {
        const userId = req.userToken.id;

        const data = await Users.findByPk(userId, {
            attributes: ["id", "username", "email", "role"],
        });
        if (!data) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.json(data).status(200);
    } catch (error) {
        console.error("Error in getLoginById:", error);
        res.status(422).json({ msg: "Unprocessable Entity" });
    }
};

const logout = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            await Blacklist.create({ token: token });
            res.json({ msg: 'Logout successfully' }).status(200);
        } else {
            res.json({ msg: 'Token required' }).status(422);
        }
    } catch (error) {
        console.error(error);
        res.json({ msg: error }).status(422);
    }
};

module.exports = {
    register,
    authentication,
    logout,
    getLoginById
};
