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
    getFoodList()
  }, []);

  const getFoodList = () => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data);
    });
  }

  const addToList = async () => {
    await Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      ingrediente: ingrediente,
      modPreparo: modPreparo,
      rendimento: rendimento,
    });
    getFoodList();
  };

  const updateFood = async (id) => {
    await Axios.put("http://localhost:3001/update", {
      id: id, 
      newFoodName: newFoodName,
    });
    getFoodList();
  };

  const deleteFood = (id, index) => {
    foodList.splice(index,1)
    setFoodList([...foodList])
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
    <textarea 
      onChange={(event) => {
        setIngrediente(event.target.value);
      }}
    />
    <label>Modo de Preparo:</label>
    <textarea 
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

    
      <table>
        <thead>
          <tr>
            <th width="30%" colSpan="2">Nome</th>
            <th>Ingredientes</th>
            <th>Modo de Preparo</th>
            <th>Rendimento</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {foodList.map((val, index) => (
          <tr key={val._id}>
            <td>{val.foodName}</td>
            <td>
              <input 
                type="text" 
                placeholder="Renomear..."
                onChange={(event) => {
                  setNewFoodName(event.target.value);
                }} 
              />
            </td>
            <td>{val.ingrediente}</td>
            <td>{val.modPreparo}</td>
            <td>{val.rendimento}</td>
            <td>
              <div class="flex">
                <button type="button" onClick={() => updateFood(val._id)} ><i class="far fa-edit"></i> Editar </button>
                <button type="button" onClick={() => deleteFood(val._id, index)} ><i class="far fa-trash-alt"></i> Excluir </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
  </div>
  );
};

export default App;
