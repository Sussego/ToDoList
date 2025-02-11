import { useState, useEffect, use } from "react";
import './App.css';
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [tarefas,setTarefas] = useState(()=>{
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("Todas");
  const [modoApagar, setModoApagar] = useState(false);

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
      <button
        onClick={() => setFiltro("Todas")}
        className={filtro === "Todas" ? "filtro-selecionado" : "filtro"}>Todas</button>

      <button
        onClick={() => setFiltro("Pendentes")}
        className={filtro === "Pendentes" ? "filtro-selecionado" : "filtro"}>Pendentes</button>

      <button
        onClick={() => setFiltro("Concluidas")}
        className={filtro === "Concluidas" ? "filtro-selecionado" : "filtro"}>Concluídas</button>

      <button
        class="btnApagar"
        onClick={() => setModoApagar(!modoApagar)}
        style={{
          backgroundColor: modoApagar ? "#d32f2f" : "#bebebe",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          fontSize: "20px",
        }}>
        <i className="fa fa-trash"></i>
      </button>
      </div>

      <div>
      
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa, index)=> (
          <li
            key={index}
            onClick={()=>modoApagar ? removerTarefa(index) : marcarConcluida(index)}
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
