import { useState } from 'react';
import BudgetBack from './components/BudgetBack';
import BudgetFront from './components/BudgetFront';
import GastoItem from './components/GastoItem';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import './index.css';
import { useEffect } from 'react';

function App() {
  const [presupuesto, setPresupuesto] = useState(
    JSON.parse(localStorage.getItem('presupuesto')) || ''
  );
  const [error, setError] = useState(false);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(
    JSON.parse(localStorage.getItem('gastosLista')).length > 0 ||
      JSON.parse(localStorage.getItem('presupuesto')) !== ''
      ? true
      : false
  );
  const [gastosLista, setGastosLista] = useState(
    JSON.parse(localStorage.getItem('gastosLista')) || []
  );
  const [editarGasto, setEditarGasto] = useState(false);
  const [itemAEditar, setItemAEditar] = useState({});
  const [categoriaFiltroGasto, setCategoriaFiltroGasto] = useState('full');

  useEffect(() => {
    localStorage.setItem('gastosLista', JSON.stringify(gastosLista));
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
  }, [gastosLista, presupuesto]);

  const eliminarItem = (id) => {
    setGastosLista((gastosLista) => {
      return gastosLista.filter((itemLista) => itemLista.id !== id);
    });
  };

  const editarItem = (itemLista) => {
    setEditarGasto(true);
    setItemAEditar(itemLista);
  };

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction onClick={() => editarItem(id)}>
        <div className="bg-blue-600 text-white justify-center items-center flex text-lg uppercase rounded w-3 mx-4">
          <p>Editar</p>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction destructive={false} onClick={() => eliminarItem(id)}>
        <div className="bg-red-600 text-white justify-center items-center flex text-lg uppercase rounded w-3 mx-4">
          <p>Eliminar</p>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="App ">
      <div className="container mx-auto flex justify-center mt-20 flex-col items-center ">
        <h1 className="uppercase text-white text-3xl text-center">
          Planificador de Gastos
        </h1>
        <div className="md:w-[50rem] mt-4 bg-white p-10 rounded-lg shadow-lg">
          {isValidPresupuesto ? (
            <BudgetBack
              presupuesto={presupuesto}
              gastosLista={gastosLista}
              setGastosLista={setGastosLista}
              editarGasto={editarGasto}
              setEditarGasto={setEditarGasto}
              itemAEditar={itemAEditar}
              setIsValidPresupuesto={setIsValidPresupuesto}
              setPresupuesto={setPresupuesto}
            />
          ) : (
            <BudgetFront
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              error={error}
              setError={setError}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
          )}
        </div>

        {isValidPresupuesto && (
          <>
            <div className="md:w-[50rem] mt-4 bg-white p-10 rounded-lg shadow-lg flex items-center gap-3">
              <label htmlFor="categoria-filtro-gasto">Filtro</label>
              <select
                className="bg-slate-200 px-3 py-3 rounded text-black text-center text-lg grow"
                name="categoria-filtro-gasto"
                id="categoria-filtro.gasto"
                value={categoriaFiltroGasto}
                onChange={(e) => {
                  setCategoriaFiltroGasto(e.target.value);
                }}
              >
                <option value="full">--- Todas las Categorias ---</option>
                <option value="ahorro">Ahorro</option>
                <option value="casa">Casa</option>
                <option value="comida">Comida</option>
                <option value="gastos">Gastos</option>
                <option value="ocio">Ocio</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">Suscripciones</option>
              </select>
            </div>

            <div className="md:w-[50rem] mt-4 bg-white p-10 rounded-lg shadow-lg h-[31rem] overflow-scroll scrollbar">
              {gastosLista.length > 0 ? (
                gastosLista.map((itemLista) => {
                  return (
                    <SwipeableList key={itemLista.id}>
                      <SwipeableListItem
                        leadingActions={leadingActions(itemLista)}
                        trailingActions={trailingActions(itemLista.id)}
                      >
                        <GastoItem
                          key={itemLista.id}
                          itemLista={itemLista}
                          categoriaFiltroGasto={categoriaFiltroGasto}
                        />
                      </SwipeableListItem>
                    </SwipeableList>
                  );
                })
              ) : (
                <div className="flex justify-center items-center uppercase text-2xl font-black">
                  <p>Por favor añada un gasto</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
