import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";

function App(){
  const [alunos, setAlunos] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")
  const [editando, setEditando] = useState(false)
  const [idAtual, setIdAtual] = useState(null)

  async function buscarAlunos(){
    const resposta = await axios.get('https://supreme-space-waffle-r4rwg7wxvp4x256w-3001.app.github.dev/alunos')
    setAlunos(resposta.data)
  } 

  useEffect(()=>{buscarAlunos()},[])



  async function salvar(e){
    e.preventDefault()
    const aluno = {nome, email, curso}

    if(editando){
      await axios.put(`https://supreme-space-waffle-r4rwg7wxvp4x256w-3001.app.github.dev/alunos/${idAtual}`,aluno)
      setEditando(false)
      setIdAtual(null)
    } 
    else{
      await axios.post("https://supreme-space-waffle-r4rwg7wxvp4x256w-3001.app.github.dev/alunos",aluno)
    }
    
    limparFormulario()
    buscarAlunos()
  }

  async function excluir(id) {
    await axios.delete(`https://supreme-space-waffle-r4rwg7wxvp4x256w-3001.app.github.dev/alunos/${id}`)
    buscarAlunos()
  }

  function limparFormulario(){
    setNome('')
    setEmail('')
    setCurso('')
  }

  function editar(aluno){
    setNome(aluno.nome)
    setEmail(aluno.email)
    setCurso(aluno.curso)
    setIdAtual(aluno.id)
    setEditando(true)
  }

  return(
    <div style={{padding:20}}>
      <h1>CRUD de Alunos</h1>

      <form onSubmit={{salvar}}>
        <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(texto)=>setNome(texto.target.value)}
        />
        <br/>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(texto)=>setEmail(texto.target.value)}
          />
        <br/>
        <input
         type="text"
          placeholder="Curso"
          value={curso}
          onChange={(texto)=>setCurso(texto.target.value)}
        />
        <br/>
        <button type="submit">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    <hr/>

    {
      alunos.map((aluno)=>(
        <div key={aluno.id}>
          <h3>{aluno.nome}</h3>
          <p>{aluno.email}</p>
          <p>{aluno.curso}</p>
          <button onClick={()=> editar(aluno)}>Editar</button>
          <button onClick={()=> editar(aluno.id)}>Excluir</button>
          <hr/>
        </div>
      ))
    }
    </div>
  )
}

export default App