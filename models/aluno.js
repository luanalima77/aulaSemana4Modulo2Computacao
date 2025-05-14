const db = require('../config/db');

async function create(data) {
  const query = 'INSERT INTO aluno (nome, email, curso_id) VALUES ($1, $2, $3)';
  const values = [data.nome, data.email, data.curso_id || null];
  return db.query(query, values);
}

async function findAll() {
  const result = await db.query('SELECT * FROM aluno ORDER BY id ASC');
  return result.rows;
}

async function update(id, data) {
  const query = 'UPDATE aluno SET nome = $1, email = $2, curso_id = $3 WHERE id = $4';
  const values = [data.nome, data.email, data.curso_id || null, id];
  return db.query(query, values);
}

async function deleteAluno(id) {
  const query = 'DELETE FROM aluno WHERE id = $1';
  return db.query(query, [id]);
}

async function findAllComCurso() {
  const query = `
    SELECT aluno.id, aluno.nome, aluno.email, curso.nome AS curso
    FROM aluno
    LEFT JOIN curso ON aluno.curso_id = curso.id
    ORDER BY aluno.id ASC
  `;
  const result = await db.query(query);
  return result.rows;
}

async function findByCurso(curso_id) {
  const query = `
    SELECT aluno.id, aluno.nome, aluno.email
    FROM aluno
    WHERE curso_id = $1
    ORDER BY nome ASC
  `;
  const result = await db.query(query, [curso_id]);
  return result.rows;
}

module.exports = {
  create,
  findAll,
  update,
  deleteAluno,
  findAllComCurso,
  findByCurso
};