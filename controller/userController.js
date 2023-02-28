const express = require('express')
const db = require('../db.config/db.config.js')
const jwt = require('jsonwebtoken');
//const Auth = require('../middleware/auth')
const cookieParser = require('cookie-parser');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { query } = require('express');
const { Services } = require('../services/index.js');
SECRET = process.env.SECRET


const register = async (req, res, next) => {
    // * 7. silahkan ubah password yang telah diterima menjadi dalam bentuk hashing
    const { username, email, password } = req.body

    // 8. Silahkan coding agar pengguna bisa menyimpan semua data yang diinputkan ke dalam database
    try {
        const result = await Services.register(username, email, password)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.send("Berhasil Register")
    } catch (error) {
        console.log(error.detail)
        res.send(error.detail);
    }
}

const login = async (req, res, next) => {
    // 9. komparasi antara password yang diinput oleh pengguna dan password yang ada didatabase
    const { email, password } = req.body
    try {
        var result = await Services.login(email, password)
        res.send(result)
    } catch (error) {
        res.send("Email Tidak Valid");
    }
}

const verify = async (req, res, next) => {
    try {
        // 13. membuat verify
        const decode = req.user
        const user = await Services.verify(decode.email, decode.password)
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}
/*
const updateprofile = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.updateprofile(body.user, body.email, body.id)
        if (result == 'sudah update') {
            res.status(200).send('sudah update')
        } else {
            throw new Error(result)
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const changePw = async (req, res, next) => {
    try {
        // 13. membuat verify
        const decode = req.user
        const body = req.body
        var result = await Services.changePw(body.oldpw, body.newpw, decode.password, decode.id)
        if (result == 'Invalid User') {
            res.status(412).send(result)
        } else if (result == 'sudah update') {
            res.status(200).send(result)
        } else {
            return res.status(500).send(err)
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const addresses = async (req, res, next) => {
    try {
        const body = req.body
        const address = await Services.addresses(body.id)
        res.status(200).json(address)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const updateaddress = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.updateaddress(body.cust_name, body.cust_phone, body.cust_address, body.cust_id)
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const addaddress = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.addaddress(body.cust_name, body.cust_phone, body.cust_address, body.user_id)
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const requests = async (req, res, next) => {
    try {
        const body = req.body
        const requests = await Services.requests(body.id)
        res.status(200).json(requests)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const addrequest = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.addrequest(body.req_unit, body.req_cust, body.req_mode, body.req_notes, body.req_est)
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const deleteaddress = async (req, res, next) => {
    try {
        const body = req.body
        const result =  await Services.deleteaddress(body.cust_id)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const deleterequest = async (req, res, next) => {
    try {
        const body = req.body
        const result =  await Services.deleterequest(body.req_id)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const pickedrequest = async (req, res, next) => {
    try {
        const body = req.body
        const result =  await Services.pickedrequest(body.req_id)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const addorder = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.addorder(body.cost, body.qty, body.address, body.type, body.notes, body.user)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const orders = async (req, res, next) => {
    try {
        const body = req.body
        const requests = await Services.orders(body.id)
        if (requests instanceof Error) {
            throw new Error(requests);
        }
        res.status(200).json(requests)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const updateorder = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.updateorder(body.order_stat, body.order_id)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}
*/
module.exports = {
    register,
    login,
    verify,
    /*updateprofile,
    changePw,
    addresses,
    updateaddress,
    addaddress,
    deleteaddress,
    addrequest,
    requests,
    deleterequest,
    pickedrequest,
    addorder,
    orders,
    updateorder*/
}