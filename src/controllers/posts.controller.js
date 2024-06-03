const Posts = require("../models/posts.model");
const Autores = require ('../models/autores.model')



const getAllPosts = async (req, res, next) => {
    try {
      const [posts] = await Posts.selectAll();
  
      // Obtiene los autores de cada post y los añade a la respuesta
      const result = []
      for (let post of posts) {
        const autor_id = post.autores_id;
        const [[autor]] = await Autores.selectById(autor_id);
        result.push ([post,autor])
      }
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };


  const getPostById = async (req, res, next) => {
    try {
      const [postResult] = await Posts.selectById(req.params.post_id);
  
      if (postResult.length === 0) {
        return res.status(404).json({ error: "Id de post inexistente" });
      }
      const post = postResult[0]
  
      // recupera el autor del post y obtiene su información para añadirla a la respueusta
      const autor_id = postResult[0].autores_id
      const [[autor]] = await Autores.selectById(autor_id)
      
      const result = [post, autor]
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };



  const getPostsByAutorId = async (req, res, next) => {
    try {
      const [result] = await Posts.selectByAutorId(req.params.autor_id)
      if (result.length === 0) return res.status(404).json ({error: "No hay ningún post del autor especificado"})
      res.json (result)
    } catch (error) {
      next (error)
    }
  }



  const createPost = async (req, res, next) => {

    const { categoria } = req.body
    
    // verifica que la categoría existe en el set definido en BBDD 
    try {
      await checkCategoria(categoria)
    } catch (error) {
      res.status(400).send(error.message)
    }
    
    try {
      const [result] = await Posts.insertNew(req.body);
  
      if (result.affectedRows === 0) {
        return res
          .status(500)
          .json({ error: "Ha ocurrido un error inesperado durante la creación" });
      }
      const [[newPost]] = await Posts.selectById(result.insertId);
      return res.json(newPost);
    } catch (error) {
      next(error);
    }
  };



  const updatePostById = async (req, res, next) => {
    try {
      const post_id = req.params.post_id;
  
      const [result] = await Posts.updateById(post_id, req.body);
  
      if (result.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: "Se ha producido un error al actualizar" });
      }
  
      const [[updatedUser]] = await Posts.selectById(req.params.post_id);
      return res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };


  const deletePostById = async (req, res, next) => {
    try {
      const post_id  = req.params.post_id;
  
      const [result] = await Posts.deleteById(post_id);
  
      if (result.affectedRows === 1) {
        return res.json({ message: `Post ${post_id} borrado correctamente` });
      }
  
      return res.status(404).json({ error: "Id de post inexistente" });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAutorId,
    createPost,
    updatePostById,
    deletePostById
};