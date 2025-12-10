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


// CÓDIGO SOLUCIONADO en consultas.js:
const agregarPost = async (titulo, img, descripcion) => {
    // 1. CAMBIO CLAVE: Agregamos RETURNING *
    const consulta = "INSERT INTO posts (titulo,img,descripcion, likes) VALUES ($1,$2,$3, 0) RETURNING *"; 
    
    const values = [titulo, img, descripcion];
    const result = await pool.query(consulta, values);

    // 2. CAMBIO CLAVE: Devolvemos el objeto post completo
    return result.rows[0]; 
};

// const agregarPost = async(titulo,img,descripcion) =>{
//     const consulta ="INSERT INTO posts (titulo,img,descripcion, likes) VALUES ($1,$2,$3, 0)"
//     const values = [titulo,img,descripcion];
//     const result = await pool.query(consulta,values);
//     console.log('post agregado');
//     return result.rows[0];
// }

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