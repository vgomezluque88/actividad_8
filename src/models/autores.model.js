const selectAll = () => {
    return db.query("select * from autores");
};


const selectById = (id) => {
    return db.query("select * from autores where id = ?", [id]);
};  


const selectByEmail = (email) => {
    return db.query("select * from autores where email = ?", [email]);
};


const insertNew = ({ nombre, email, imagen }) => {
    return db.query("insert into autores (nombre, email, imagen) values(?,?,?)", [
      nombre,
      email,
      imagen,
    ]);
};


const updateById = (autor_id, { nombre, email, imagen }) => {
    return db.query(
      "update autores set nombre = ?, email = ?, imagen = ? where id = ?",
      [nombre, email, imagen, autor_id]
    );
};


const deleteById = (autor_id) => {
    return db.query("delete from autores where id = ?", [autor_id]);
};

  
module.exports = {
    selectAll,
    selectById,
    selectByEmail,
    insertNew,
    updateById,
    deleteById,
};
  