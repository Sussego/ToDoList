import { useState } from "react";
import './App.css';

function App() {
  const [tarefas,setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () =>{
    if (novaTarefa.trim() !== ''){
      setTarefas([...tarefas, {texto: novaTarefa, concluida:false}]);
      setNovaTarefa("");
    }
  };

  const marcarConcluida = (index)=>{
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida; //inversão
    setTarefas(novasTarefas);
  };

  const removerTarefa = (index)=>{
    const novasTarefas = tarefas.filter((_,i)=>i !== index);
    setTarefas(novasTarefas)
  };


  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Lista de Tarefas</h1>
        <input
          type="text"
          placeholder="Digite uma Tarefa"
          value={novaTarefa}
          onChange={(e)=>setNovaTarefa(e.target.value)}
        />
        
        <button onClick={adicionarTarefa}>Adicionar</button>

        <ul>
          {tarefas.map((tarefa, index)=> (
            <li
              key={index}
              onClick={()=>marcarConcluida(index)}
              style={{cursor:'pointer', 
                textDecoration:tarefa.concluida ? "line-through" : "none", 
                color: tarefa.concluida ? "#888" : "#000"}}>
              {tarefa.texto}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App
