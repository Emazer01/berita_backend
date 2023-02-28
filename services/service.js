const db = require('../db.config/db.config.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const register = async (username,email,password) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        console.log("sebelum query")
        console.log(username,email,hash)
        const query = `INSERT INTO user_cred VALUES(DEFAULT, $1, $2, $3, DEFAULT)`
        const result = await db.query(query,[username,email,hash])
        console.log(result)
        //const query = `INSERT INTO user_cred VALUES(DEFAULT, $1, $2, $3, DEFAULT)`;
        //const result = await db.query(query,[username,email,hash]);
        console.log("selesai query")
        if (!result) {
            throw new Error('Error inserting Data');
        }
        return {
            message: 'Data inserted successfully',
        }; 
    } catch (error) {
        console.log("error")
        response.send("error")
        return error;
    }
}

const login = async (email,password) => {
    try {
        const query = `SELECT * FROM user_cred WHERE user_email=$1`
        const user = await db.query(query, [email])
        var id = user.rows[0]['user_id']
        var username = user.rows[0]['username']
        var hash = user.rows[0]['user_pass']
        var hasil = await bcrypt.compare(password, hash)
        if (hasil == true) {
            // 10. Generate token menggunakan jwt sign
            let data = {
                id: id,
                username: username,
                email: email,
                password: hash
            }
            const token = jwt.sign(data, SECRET);
            const result = {
                id:id,
                username:username,
                email:email,
                token:token
            }
            return (result)
        } else {
            return('Password Salah');
        }
    } catch (error) {
        return('Password Salah');
    }
}

const verify = async (email,password) => {
    try {
        const query = `SELECT * FROM user_cred WHERE user_email=$1 AND user_pass=$2`
        const user = (await db.query(query,[email,password])).rows
        if (user == '') {
            return('Invalid User')
        } else {
            if (user[0].user_priv == 1) {
                return({
                    id:user[0].user_id,
                    priv:user[0].user_priv})
            }else{
                return({id:user[0].user_id})
            }
        }
    } catch {

    }
}
/*
const updateprofile = async (username,email,id) => {
    try {
        const query = `UPDATE user_cred SET username=$1, user_email=$2 WHERE user_id=$3`
        const user = await db.query(query,[username,email,id])
        return ('sudah update')
    } catch {
        console.log(err.message);
        return err
    }
}

const changePw = async (oldpw,newpw,password,id) => {
    try {
        var result = await bcrypt.compare(oldpw,password)
        if (result != true) {
            return('Invalid User')
        } else {
            const hash = await bcrypt.hash(newpw, 10)
            const query = `UPDATE user_cred SET user_pass=$1 WHERE user_id=$2`
            await db.query(query, [hash,id])
            return('sudah update')
        }
    } catch {
        console.log(err.message);
        return err
    }
}

const addresses = async (id) => {
    try {
        const query = `SELECT * FROM customer_data WHERE user_id=$1`
        const address = (await db.query(query, [id])).rows
        return(address)
    } catch {
        return Error
    }
}

const updateaddress = async (cust_name,cust_phone,cust_address,cust_id) => {
    try {
        const query = `UPDATE customer_data SET cust_name=$1, cust_phone=$2, cust_address=$3 WHERE cust_id=$4`
        await db.query(query, [cust_name,cust_phone,cust_address,cust_id])
        return('sudah update')
    } catch (err){
        return Error
    }
}

const addaddress = async (cust_name,cust_phone,cust_address,user_id) => {
    try {
        const query = `INSERT INTO customer_data(cust_id,cust_name,cust_phone,cust_address,user_id) VALUES(DEFAULT,$1,$2,$3,$4)`
        await db.query(query, [cust_name,cust_phone,cust_address,user_id])
        return('sudah insert')
    } catch (err){
        return Error
    }
}

const requests = async (id) => {
    try {
        if (id == '') {
            const query = `SELECT a.req_id, a.req_date, a.req_notes,  d.stat_label, c.mode_label, c.plus_price, a.req_unit, b.cust_name, b.cust_phone, b.cust_address, b.user_id, a.req_est_cost, c.mode_type  
                FROM req_list a INNER JOIN customer_data b ON a.req_cust = b.cust_id INNER JOIN modes c ON a.req_mode = c.mode_id INNER JOIN req_status d ON a.req_stat = d.stat_id 
                INNER JOIN types e ON  c.mode_type = e.type_id ORDER BY a.req_id`
            const requests = (await db.query(query)).rows
            return(requests)
        } else {
            const query = `SELECT a.req_id, a.req_date, a.req_notes,  d.stat_label, c.mode_label, c.plus_price, a.req_unit, b.cust_name, b.cust_phone, b.cust_address, b.user_id, a.req_est_cost, c.mode_type  
                FROM req_list a INNER JOIN customer_data b ON a.req_cust = b.cust_id INNER JOIN modes c ON a.req_mode = c.mode_id INNER JOIN req_status d ON a.req_stat = d.stat_id 
                INNER JOIN types e ON  c.mode_type = e.type_id WHERE b.user_id = $1 ORDER BY a.req_id`
            const requests = (await db.query(query, [id])).rows
            return(requests)
        }
    } catch (error) {
        return error
    }
}

const addrequest = async (req_unit,req_cust,req_mode,req_notes,req_est) => {
    try {
        const date = new Date()
        const query = `INSERT INTO req_list(req_id,req_date,req_unit,req_cust,req_stat,req_mode,req_notes,req_est_cost) VALUES(DEFAULT,$1,$2,$3,DEFAULT,$4,$5,$6)`
        await db.query(query, [date,req_unit,req_cust,req_mode,req_notes,req_est])
        return('berhasil request')
    } catch (error) {
        return error
    }
}

const deleteaddress = async (id) => {
    try {
        const query = `DELETE FROM customer_data WHERE cust_id = $1`
        await db.query(query, [id])
        return('berhasil request')
    } catch (err){
        return Error
    }
}

const deleterequest= async (id) => {
    try {
        const query = `DELETE FROM req_list WHERE req_id = $1`
        await db.query(query, [id])
        return('berhasil cancel')
    } catch (err){
        return Error
    }
}

const pickedrequest = async (id) => {
    try {
        const query = `UPDATE req_list SET req_stat=2 WHERE req_id = $1`
        await db.query(query, [id])
        return('berhasil update')
    } catch (err){
        return Error
    }
}

const addorder = async (cost,qty,address,type,notes,user) => {
    try {
        const date = new Date()
        const query = `INSERT INTO order_list(order_id, order_date, order_bill, order_unit, order_cust, order_stat, order_mode, order_notes, order_user) VALUES(DEFAULT,$1,$2,$3,$4,DEFAULT,$5,$6,$7)`
        await db.query(query, [date,cost,qty,address,type,notes,user])
        return('berhasil request')
    } catch (err){
        return Error
    }
}

const orders = async (id) => {
    try {
        if (id == '') {
            const query = `SELECT a.order_id, a.order_date, a.order_bill, a.order_unit, a.order_cust, a.order_mode, a.order_notes, b.stat_label
                FROM order_list a INNER JOIN order_status b ON a.order_stat=b.stat_id ORDER BY a.order_id`
            const requests = (await db.query(query)).rows
            return(requests)
        } else {
            const query = `SELECT a.order_id, a.order_date, a.order_bill, a.order_unit, a.order_cust, a.order_mode, a.order_notes, b.stat_label
                FROM order_list a INNER JOIN order_status b ON a.order_stat=b.stat_id WHERE a.order_user=$1 ORDER BY a.order_id`
            const requests = (await db.query(query, [id])).rows
            return(requests)
        }
    } catch (err){
        return Error
    }
}

const updateorder = async (order_stat,order_id) => {
    try {
        const query = `UPDATE order_list SET order_stat=$1 WHERE order_id = $2`
        await db.query(query, [order_stat,order_id])
        return('berhasil update')
    } catch (err){
        return Error
    }
}
*/
module.exports =  {
    register,
    login,
    verify,
    /*updateprofile,
    changePw,
    addresses,
    updateaddress,
    addaddress,
    requests,
    addrequest,
    deleteaddress,
    deleterequest,
    pickedrequest,
    addorder,
    orders,
    updateorder*/
}