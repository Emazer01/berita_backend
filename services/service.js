const db = require('../db.config/db.config.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const register = async (username,email,password,wartawan) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        console.log("sebelum query")
        console.log(username,email,hash)
        const query = `INSERT INTO user_cred VALUES(DEFAULT, $1, $2, $3)`
        const result = await db.query(query,[username,email,hash])
        const query2 = `SELECT * FROM user_cred WHERE user_email=$1`;
        const result2 = await db.query(query2,[email]);
        console.log(result2.rows[0]['user_id'])
        const placeholderPhoto = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAMgBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYIBAUHAQMC/9oACAEBAAAAAO/gAAAAAAAAAAAAAAAAAMHlcbknVM4AACHVO0RvbYzEAAMClejDe3UzgABxysYFnOxgACv3AQO8WHAAHIavAWc7GAAMClWkDe3VzQAB5CaoaY3lr5n6AAfGskasXGo/v5TXGS2b+wAHlXeRv3N99oYR+HXLRegA5TVYALU9WABTGHABMbnABHaR+AB7dyRADTVBi4ASi325ADT1RgwBOLX7gAD48Q4XqQ2vc+4/YAAY8Ah+u2Mwn+QAAAAAAAAAAAAAAAAAB//EAD8QAAEDAgIGBgcDDQEAAAAAAAECAwQFBgARBxIhMUFRCCIwYXGhEyBAQnKBkRQYIxA0NkNSYGJ0krLB0dKx/9oACAEBAAE/AP3uqtYp1EhKmVOYzFjp3rdWEj5c8VvpD27BcU1S4UqoqH6zY0g+Ge3yx95WV6T9G2dT+ZOf9uKJ0h7dnOJaqkKVTlH9ZsdQPHLb5YpVYp1bhJmUyYzKjq3LaWFD58vZNIOkGnWJSPTv5PTngRGig7VnmeSRzxdF3Vi7qkqbVpanTn1GgckNjkkcPUte7qxaNSTNpMtTRz67ROaHByUOONH2kGnX3SPTsZMzmQBJik7UHmOaTz9irVWi0KjS6pMVqx4zRcWeeXDxO7F23PNu64ZNWnLJU6rJtGextHBI8PWtG6Jto3FGq0JZBaVk4jPY4jik4o9VjVykRKnDXrx5LSXEHuI3eI3ew9Imsrh2fCpjasjOkZry4pQM8vqR2HR4ri51oTaU4rMwJGbefBCxnl9QfYekqlWtby9upk8Pn1ew6NWv9vuDfqeiZ+uavYekNR1TbHjVFtOaoMkFWXBCxqnzy7Do8UNcGz5lUdTkZ8jJGfFCBln9SfYa1SY1do0ulzE60eU0ptY5Z8fEb8XXbU207hlUmcghbKuovLY4jgoeI9a0bYm3dcUakwkHNxWbjmWxtHFRxR6XGolIiUyGjUjxmktoHcBv8fYVKCQSSABvJxpAsCm6QaKkBaG5zQJiy07cv4TlvScXJa9WtSprgVaItlwHqqyzQ4OaTxHqWzaVYu2ppg0mIt1RPXcIyQ2OajwxYVhUzR/RFIStDkx0Aypa8hrHkOSRhKgoAggg7iPYJUpiFFckyXUNMNJKluLOQSBxJxpQ0ySricdpFBcXHpIJSt5J1VyP9J7uOLE0oVyyZKUNuqlUwn8SG6rZlzSfdOKVctlaUqR9mWI0kkZrhSgA62e7j8xirdHe2Zi1Lp02bAJ9zMOJH12+eD0aT6TZco1O+Jt/uxRujxbcJxLlTnS6gR7mxpB8ctvnisXTZujGkfZk/ZoxSPw4MUD0iz3gf+nF96UK3e0lSHHVRaaD+HDaVsy5qPvHGi/TJKt1xqkV5xcikkhKHlHWXH/2nu4YiymJsVuTGdQ6w6kKQ4g5hQPEHtlKCQSSABtJONMek9y46i5QqU8RSI6tVxaD+cLHH4Rw+v5WXnY7qXWXFtuJOaVIUQQe4jFI0wXvRm0ttVhchpO5EpAd8zt88feFvLU1fRU3P9r0B/6xV9MF71ltTbtYXHaVvRFQGvMbfPDzzsh1Trzi3HFHNSlqJJPeT+XQ5pPctyot0KqvE0iQrVbWs/m6zx+E8frhKgoAggg7QR2unK91W5bKaTCd1J9SBSVJO1tr3j8931xv7LdjQbeyrjtlVJmu68+mgJBUdrjXun5bvp2hOQzONKNyKue/qjMCyqO0sx4/LURs8zmfn2mi65FWxf1OmFerHdWI8gcChezyOR+WAcxmOzvutC37Hq9S1sltRlBv41dVPmRhSiokk5k7Se0SopIIORG0HFiVoXBY9IqWtmt2OkOfGnqq8x2d021Cuy35NHn6/oXgMlIORSobQR4HF7WPVLIrCoU9BWyokx5KR1HU/wCDzHaWTY9UvesphQEFDKCDIkqHUaT/AJPIYta2oVp2/Go8DXLLIOalnMqUdpJ8T2ly2zS7ro7tMqscOsr2pV7zauCkngcX/oyq9jzFLcQqTS1K/CmITs8Fcj2VgaM6vfExKm0KjUxCvxpi07PBP7RxbVs0u1KO1TKUwGmUbVK95xXFSjxPbSokedGcjSmW3mHBqrbcTrJUO8Yvfo/MSVOTbUeSw4cyYTx6h+FXDwOK3bNZtyUY9Xpz8RYOQLiOqrwVuPrUS2qzccoR6RTpEtwnIltHVT4ncMWT0fmY6m511vpeWMlCEyeoPiVx8BiJEjwYrcaKy2yw2NVDbackpHcPYZkGJUY6o8yMzIZVvQ6gKB+RxWdB9lVZSltwnYDh4xHNUf0nMYmdGuIpRMK4nkDgHo4V5gjH3apmt+kjGX8sf+sQ+jXESoGbcT6xxDMcJ8yTijaD7KpKkuOQXJ7g96W4VD+kZDEODEp0dMeHGZjsp3IaQEgfIfvd/9k=`
        const query3 = `INSERT INTO profile(profile_id, user_id, nama_lengkap, no_hp, foto, level_akun_id, bio) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6)`
        const result3 = await db.query(query3,[result2.rows[0]['user_id'], '', '', placeholderPhoto, wartawan, '']);
        console.log(result3)
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

const verify = async (id) => {
    try {
        console.log(id)
        const query = `SELECT a.profile_id, a.nama_lengkap, a.no_hp, a.foto, a.bio, b.level_akun_label FROM profile AS a INNER JOIN level_akun AS b ON a.level_akun_id=b.level_akun_id WHERE a.user_id=$1`
        const user = (await db.query(query,[id])).rows
        if (user == '') {
            return('Invalid User')
        } else {
            return({profile:user[0]})
        }
    } catch {

    }
}

const updateprofile = async (id,namaLengkap,noTelepon,bio,fotoUrl) => {
    try {
        console.log("sampe service")
        const query = `UPDATE profile SET nama_lengkap=$1, no_hp=$2, bio=$3, foto=$4 WHERE user_id=$5`
        const user = await db.query(query,[namaLengkap,noTelepon,bio,fotoUrl,id])
        return ('sudah update')
    } catch {
        console.log(err.message);
        return err
    }
}

const updateakun = async (username,email,id) => {
    try {
        const query = `UPDATE user_cred SET username=$1, user_email=$2 WHERE user_id=$3`
        const user = await db.query(query,[username,email,id])
        return ('sudah update')
    } catch {
        console.log(err.message);
        return err
    }
}

const submitberita = async (profile_id,judul,nama,deskripsi,harga,date,lelang,kategori,note,fotoUrl,file) => {
    try {
        const query = `INSERT INTO berita VALUES(DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
        await db.query(query, [profile_id,judul,deskripsi,fotoUrl,nama,file,note,harga,date,kategori,lelang])
        return('berhasil request')
    } catch (error) {
        return error
    }
}

const beritas = async (profile_id) => {
    try {
        const query = `SELECT * FROM berita WHERE profile_id=$1`
        const daftar_berita = (await db.query(query, [profile_id])).rows
        return(daftar_berita)
    } catch {
        return Error
    }
}

const main = async () => {
    try {
        const query = `SELECT * FROM berita ORDER BY berita_id DESC`
        const daftar_berita = (await db.query(query)).rows
        return(daftar_berita)
    } catch {
        return Error
    }
}

const view = async (berita_id) => {
    try {
        const query = `SELECT * FROM berita INNER JOIN kategori ON berita.kategori_id=kategori.kategori_id INNER JOIN level_berita ON berita.level_berita_id=level_berita.level_berita_id WHERE berita_id=$1`
        const daftar_berita = (await db.query(query, [berita_id])).rows
        return(daftar_berita)
    } catch {
        return Error
    }
}

const penawarans = async (berita_id) => {
    try {
        const query = `SELECT * FROM penawaran WHERE berita_id=$1`
        const daftar_penawaran = (await db.query(query, [berita_id])).rows
        return(daftar_penawaran)
    } catch {
        return Error
    }
}

const verifwar = async (profile_id) => {
    try {
        const query = `SELECT level_akun_id FROM profile WHERE profile_id=$1`
        const level = (await db.query(query, [profile_id])).rows
        return(level)
    } catch {
        return Error
    }
}

const submitpenawaran = async (berita_id,profile_id,user,note,harga) => {
    try {
        const query = `INSERT INTO penawaran VALUES(DEFAULT,$1,$2,$3,$4,$5,1)`
        await db.query(query, [berita_id,profile_id,user,note,harga])
        return('berhasil penawaran')
    } catch (error) {
        return error
    }
}

const submitbayar = async (berita_id,harga,penawaran_id) => {
    try {
        const query = `INSERT INTO transaksi VALUES(DEFAULT,$1,$2,1)`
        await db.query(query, [berita_id,harga])
        for (const key in penawaran_id) {
            console.log(penawaran_id[key])
            const query2 = `INSERT INTO proses VALUES(DEFAULT,$1,1,$2)`
            await db.query(query2, [penawaran_id[key],''])
        }
        //const query2 = `INSERT INTO proses VALUES(DEFAULT,$1,1,$2)`
        //await db.query(query2, [penawaran_id,''])
        return('berhasil bayar')
    } catch (error) {
        return error
    }
}
/*
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
    updateprofile,
    updateakun,
    submitberita,
    beritas,
    main,
    view,
    verifwar,
    penawarans,
    submitpenawaran,
    submitbayar
    /*changePw,
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