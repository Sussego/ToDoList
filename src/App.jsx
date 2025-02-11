import { useState, useEffect, use } from "react";
import './App.css';

function App() {
  const [tarefas,setTarefas] = useState(()=>{
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("Todas");

  useEffect(()=>{
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  },[tarefas]);

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
  
  const tarefasFiltradas = tarefas.filter((tarefa)=>{
    if(filtro === "Pendentes") return !tarefa.concluida;
    if(filtro === "Concluidas") return tarefa.concluida;
    return true;
  });

  const removerTarefa = (index)=>{
    const novasTarefas = tarefas.filter((_,i)=>i !== index);
    setTarefas(novasTarefas)
  };


  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          placeholder="Digite uma Tarefa"
          value={novaTarefa}
          onChange={(e)=>setNovaTarefa(e.target.value)}
        />
        
        <button className="Add" onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <div>
        <button onClick={()=>setFiltro("Todas")}>Todas</button>
        <button onClick={()=>setFiltro("Pendentes")}>Pendentes</button> 
        <button onClick={()=>setFiltro("Concluidas")}>Concluídas</button>
      </div>

        <ul>
          {tarefasFiltradas.map((tarefa, index)=> (
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
