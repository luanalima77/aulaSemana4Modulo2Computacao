# Funcionamento do models, controllers e endpoints no projeto

Em linhas gerais, o models interage diretamente com o banco de dados, realizando consultas a ele. Por exemplo, no arquivo aluno.js há o seguinte código:

```sql
async function create(data) {
  const query = 'INSERT INTO aluno (nome, email, curso_id) VALUES ($1, $2, $3)';
  const values = [data.nome, data.email, data.curso_id || null];
  return db.query(query, values);
}
```

Nele, ocorre um processo direto de interação entre o banco de dados e a camada de model, uma vez que há queries SQL nele, mais especificamente, interagindo com a tabela aluno (neste exemplo), adicionando valores nos campos de nome, email e curso_id.

Já o controllers faz o intermédio entre a camada model e a view, sendo uma espécie de ponte entre eles, transferindo dados por meio do processo de requisição e resposta, como é possível ver no código subsequente, com os parâmetros req e res:

```javascript
const Aluno = require('../models/aluno');
        exports.index = async (req, res) => {
        const alunos = await Aluno.findAllComCurso();
        res.render('alunos/index', { alunos });
        };

        exports.store = async (req, res) => {
        console.log(req.body); 
        const { nome, email, curso_id } = req.body;
        await Aluno.create({ nome, email, curso_id: curso_id || null });
        res.redirect('/alunos');
        };

        exports.update = async (req, res) => {
        const { id } = req.params;
        await Aluno.update(id, req.body);
        res.redirect('/alunos');
        };

        exports.destroy = async (req, res) => {
        const { id } = req.params;
        await Aluno.delete(id);
        res.redirect('/alunos');
        };

        const Curso = require('../models/curso');

        exports.index = async (req, res) => {
        const alunos = await Aluno.findAllComCurso();
        const cursos = await Curso.findAll();
        res.render('alunos/index', { alunos, cursos });
        };

        exports.byCurso = async (req, res) => {
        const { curso_id } = req.params;
        const alunos = await Aluno.findByCurso(curso_id);
        res.json(alunos);
        };
```
Por fim, os endpoints consistem em URLs que direcionam a APIs, de modo que sejam realizadas requisições. No contexto desta atividade, verifica-se a presença de endpoints nos arquivos presentes na pasta routes, uma vez que neles há os caminhos para as requisições serem realizadas, especialmente no escopo de aluno, professor e curso. <br> <br>


# Explique com suas palavras o papel de cada camada da arquitetura MVC usada neste projeto
De modo geral, as três camadas MVC interagem da seguinte forma: <br>

- Model: com os arquivos usuario.js, curso.js e professor.js, essa parte é responsável por interagir com o banco de dados e realizar as requisições a ele;
- Controller: com os arquivos usuarioController.js, cursoController.js e professorController.js, essa camada realizar as requisições HTTP para o Model, transmitindo as respostas para a View;
- View: é a camada responsável pela representação visual dos dados. No caso deste projeto, ele tem as views de professor, curso e aluno para mostrar seus respectivos dados.

Além disso, o Model, o View e o Controller interagem por meio dos seguintes códigos:
- Model com o controller: 

```javascript
//Chamando o model no controller
const Aluno = require('../models/aluno');
const Curso = require('../models/curso');
```

- Controller com o view: o controller interage com o view a partir das requisições HTTP dos dados.
<br> <br>

# Como ocorre o envio e o recebimento de dados no formato JSON neste projeto?
No projeto apresentado, o envio e o recebimento de dados no formato JSON ocorrem por meio das rotas definidas no Express, utilizando os métodos HTTP (GET e POST), como ocorre na seguinte rota (de professores):
```javascript
router.post('/edit/:id', controller.update);
```

Além disso, o Express é capaz de lidar com JSON graças ao middleware express.json(), configurado no arquivo principal da aplicação (app.js). Esse middleware permite que o servidor interprete corretamente os corpos das requisições (req.body) enviados no formato JSON.

# Qual a importância de usar HTML básico com formulários e tabelas para organizar e manipular dados no navegador?
Essa importância é materializada por meio da visualização clara dos dados que estão sendo utilizados na aplicação.

## Requisitos

- Node.js
- PostgreSQL

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/luanalima77/aulaSemana4Modulo2Computacao.git
   cd aulaSemana4Modulo2Computacao
```

2. **Instalar as dependências:**
    
```bash
npm install
```
    
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).
