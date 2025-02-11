import { useState } from "react";

function App() {
  const [tarefas,setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Lista de Tarefas</h1>
    </div>
  );
}

export default App
