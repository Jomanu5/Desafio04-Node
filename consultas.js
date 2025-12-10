const { Pool } = require('pg');
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'likeme',
    password:'postgres',
    allowExitOnIdle: true
})




const getPost = async() =>{
    const { rows} = await pool.query('SELECT * FROM posts');
    console.log(rows);
    return rows;
}


const agregarPost = async(titulo,img,descripcion) =>{
    const consulta ="INSERT INTO posts (titulo,img,descripcion, likes) VALUES ($1,$2,$3, 0)"
    const values = [titulo,img,descripcion];
    const result = await pool.query(consulta,values);
    console.log('post agregado');
}

const likePost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log('Post likeado');


}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log('Post eliminado');
}

module.exports = {getPost,agregarPost, likePost, eliminarPost};