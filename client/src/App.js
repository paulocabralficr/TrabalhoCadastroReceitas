import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  const [foodName, setFoodName] = useState("");
  const [ingrediente, setIngrediente] = useState("");
  const [modPreparo, setModPreparo] = useState("");
  const [rendimento, setRendimento] = useState("");
  const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      ingrediente: ingrediente,
      modPreparo: modPreparo,
      rendimento: rendimento,
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id, 
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  };

  return( 
  <div className="App">
    <h1> Cadastro de Receitas </h1>

    <label>Nome da Receita:</label>
    <input 
      type="text"
      onChange={(event) => {
        setFoodName(event.target.value);
      }}
    />
    <label>Ingredientes:</label>
    <input 
      type="text"
      onChange={(event) => {
        setIngrediente(event.target.value);
      }}
    />
    <label>Modo de Preparo:</label>
    <input 
    type="text"
    onChange={(event) => {
      setModPreparo(event.target.value);
    }}
    />
    <label>Rendimento:</label>
    <input 
      type="text"
      onChange={(event) => {
        setRendimento(event.target.value);
      }}
    />
    <button onClick={addToList}>Cadastrar</button>
    
    <h1>Lista de Receitas</h1>

    {foodList.map((val, key) => {
      return (
      <div key={key}>
        <h2> {val.foodName} </h2> <h4> {val.ingrediente} </h4> <h4> {val.modPreparo} </h4> <h3> {val.rendimento} </h3>
        <input 
          type="text" 
          placeholder="Renomear..." 
          onChange={(event) => {
            setNewFoodName(event.target.value);
          }} 
        />
        <button onClick={() => updateFood(val._id)}> Editar </button>
        <button onClick={() => deleteFood(val._id)}> Delete </button>
      </div>
      );
    })};
  </div>
  );
};

export default App;
