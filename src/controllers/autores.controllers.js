const Autores = require("../models/autores.model");


const getAllAutores = async (req, res, next) => {
    try {
      const [result] = await Autores.selectAll();
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };


  const getAutorById = async (req, res, next) => {
    try {
      const [result] = await Autores.selectById(req.params.autor_id);
  
      if (result.length === 0) {
        return res.status(404).json({ error: "El Id del autor ya existe" });
      }
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };


  const createAutor = async (req, res, next) => {
   
    const email = req.body.email;
    const [emailExists] = await Autores.selectByEmail(email);
    if (emailExists.length !== 0)
      return res.status(400).json({
        error:
          "El email ya existe en nuestra base de datos",
      });
  
    try {
      const [result] = await Autores.insertNew(req.body);
  
      if (result.affectedRows === 0) {
        return res
          .status(500)
          .json({ error: "error al crear el autor" });
      }
      const [[newUser]] = await Autores.selectById(result.insertId);
      return res.json(newUser);
    } catch (error) {
      next(error);
    }
  };


  const updateAutorById = async (req, res, next) => {
    try {
      const autor_id = req.params.autor_id;
  
      const [result] = await Autores.updateById(autor_id, req.body);
  
      if (result.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: "no se ha actualizado correctamente" });
      }
  
      const [[updatedUser]] = await Autores.selectById(req.params.autor_id);
      return res.json(updatedUser);
    } catch (error) {
      if (error.errno === 1062) return res
        .status(400)
        .json({
          error:
            "El email ya se encuantra registrado en nuestra base de datos",
        });
      next(error);
    }
  };


  const deleteAutorById = async (req, res, next) => {
    try {
      const autor_id = req.params.autor_id;
  
      const [result] = await Autores.deleteById(autor_id);
  
      if (result.affectedRows === 1) {
        return res.json({ message: `Autor ${autor_id} se ha borrado correctamente` });
      }
  
      return res.status(404).json({ error: "Id del autor no existe" });
    } catch (error) {
      next(error);
    }
  };



module.exports = {getAllAutores, getAutorById, createAutor, updateAutorById, deleteAutorById};