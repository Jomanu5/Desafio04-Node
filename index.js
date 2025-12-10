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

app.post('/posts', async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        await agregarPost(titulo, url, descripcion);
        res.json({ mensaje: 'Post agregado' });
        
    } catch (error) {
        res.status(500).send (error)

    }

});

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
