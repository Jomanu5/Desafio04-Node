const {agregarPost,getPost,likePost, eliminarPost} = require('./consultas');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.listen(3000, console.log('Servidor escuchando en el puerto 3000'));

app.get('/posts', async (req, res) => {
   try {const posts = await getPost();
    res.json(posts);    
   } catch (error) {
    res.status(500).send (error)
   }
   
    
});

// CÓDIGO SOLUCIONADO en index.js:
app.post('/posts', async (req, res) => {
    try {
        // 1. CORRECCIÓN: Usamos 'img' en lugar de 'url'
        const { titulo, img, descripcion } = req.body; 
        
        // 2. CAMBIO CLAVE: Capturamos el post devuelto por consultas.js
        const newPost = await agregarPost(titulo, img, descripcion); 
        
        // 3. CAMBIO CLAVE: Respondemos con el objeto newPost
        res.status(201).json(newPost); 
        
    } catch (error) {
        res.status(500).send(error)
    }
});

// app.post('/posts', async (req, res) => {
//     try {
//         const { titulo, url, descripcion } = req.body;
//         const newPost = await agregarPost(titulo, img, descripcion);
//         res.status(201).json(newPost);          
//     } catch (error) {
//         res.status(500).send (error)

//     }

// });

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.send( 'Post eliminado' );
        
        
    } catch (error) {
        res.status(500).send (error)
    }

});

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await likePost(id);
        res.send( 'Post likeado' );

        
    } catch (error) {
        res.status(500).send (error)
    }

})
