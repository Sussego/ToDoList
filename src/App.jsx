import { useState } from "react";
import './App.css';

function App() {
  const [tarefas,setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () =>{
    if (novaTarefa.trim() !== ''){
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
    }
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
            <li key={index} onClick={()=>removerTarefa(index)} style={{cursor:'pointer'}}>{tarefa}</li>
          ))}
        </ul>
    </div>
  );
}

export default App
