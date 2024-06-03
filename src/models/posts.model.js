const selectAll = () => {
    return db.query("select * from posts");
};


const selectById = (post_id) => {
    return db.query("select * from posts where id = ?", [post_id]);
};


const selectByAutorId = (autor_id) => {
    return db.query("select * from posts where autores_id = ?", [autor_id]);
};


const selectSetCategorias = () => {
    return db.query(`
      SELECT COLUMN_TYPE
      FROM information_schema.COLUMNS
      WHERE TABLE_NAME = 'posts'
      AND COLUMN_NAME = 'categoria';`)
};


const insertNew = ({ titulo, descripcion, categoria, autores_id }) => {
    return db.query(
      "insert into posts (titulo, descripcion, categoria, autores_id) values(?,?,?,?)",
      [titulo, descripcion, categoria, autores_id]
    );
};


const updateById = ( post_id,  { titulo, descripcion, categoria, autores_id }) => {
    return db.query(
      "update posts set titulo = ?, descripcion = ?, categoria = ?, autores_id = ? where id = ?",
      [titulo, descripcion, categoria, autores_id, post_id]
    );
};


const deleteById = (post_id) => {
    return db.query("delete from posts where id = ?", [post_id]);
};

  
module.exports = {
    selectAll,
    selectById,
    selectByAutorId,
    selectSetCategorias,
    insertNew,
    updateById,
    deleteById
};