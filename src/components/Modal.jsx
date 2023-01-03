import Error from './Error';
import CerrarIcono from '../assets/img/cerrar.svg';
import { useState } from 'react';
import { generarId, registrarFecha } from '../helpers';

const Modal = ({
  submitGasto,
  handleAgregar,
  nombreGasto,
  setNombreGasto,
  cantidadGasto,
  setCantidadGasto,
  categoriaGasto,
  setCategoriaGasto,
  setGastosLista,
  setSubmitGasto,
  editarGasto,
  setEditarGasto,
  itemAEditar,
}) => {
  const [isValidGasto, setIsValidGasto] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [nombreGasto, cantidadGasto, categoriaGasto].some((item) => item === '')
    ) {
      setIsValidGasto(true);
      return;
    }

    if (editarGasto) {
      const { id } = itemAEditar;

      setGastosLista((gastosLista) => {
        return gastosLista.map((listaItem) => {
          if (listaItem.id === id) {
            listaItem.nombre = nombreGasto;
            listaItem.cantidad = Number(cantidadGasto);
            listaItem.categoria = categoriaGasto;
            return listaItem;
          } else {
            return listaItem;
          }
        });
      });
    } else {
      const gastoObj = {
        nombre: nombreGasto,
        cantidad: Number(cantidadGasto),
        categoria: categoriaGasto,
        id: generarId(),
        fecha: registrarFecha(),
      };

      setGastosLista((item) => [...item, gastoObj]);
    }

    setSubmitGasto(false);
    setNombreGasto('');
    setCantidadGasto('');
    setCategoriaGasto('');
    setIsValidGasto(false);
    setEditarGasto(false);
  };
  return (
    <div
      className={`text-white h-screen w-full absolute bg-black top-0 left-0 right-0 bottom-0 bg-opacity-90 ${
        submitGasto || editarGasto ? 'block' : 'hidden'
      } p-10 font-normal z-10`}
    >
      <div
        className="absolute w-6 right-10 hover:cursor-pointer"
        onClick={() => handleAgregar(setIsValidGasto)}
      >
        <img src={CerrarIcono} />
      </div>
      <div className="w-full text-center">
        <h2 className=" text-2xl md:text-4xl uppercase border-b-4 inline-block px-20 pb-3 border-blue-900">
          Nuevo Gasto
        </h2>
      </div>
      {isValidGasto && <Error>Rellene todos los campos</Error>}
      <form
        onSubmit={handleSubmit}
        className="mt-16 max-w-[30rem] mx-auto flex flex-col gap-6"
      >
        <div>
          <label className="text-3xl mb-3 inline-block" htmlFor="nombre-gasto">
            Nombre Gasto
          </label>
          <input
            type="text"
            name="nombre-gasto"
            id="nombre-gasto"
            className="w-full px-3 py-2 rounded text-black"
            placeholder="Añada el nombre del gasto ej: Netflix"
            value={nombreGasto}
            onChange={(e) => {
              setNombreGasto(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="text-3xl mb-3 inline-block"
            htmlFor="cantidad-gasto"
          >
            Cantidad
          </label>
          <input
            type="text"
            name="cantidad-gasto"
            id="cantidad-gasto"
            className="w-full px-3 py-2 rounded text-black"
            placeholder="Añada la cantidad del gasto ej: 300"
            value={cantidadGasto}
            onChange={(e) => {
              setCantidadGasto(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="text-3xl mb-3 inline-block"
            htmlFor="categoria-gasto"
          >
            Categoria
          </label>
          <select
            className="w-full px-3 py-3 rounded text-black text-center text-lg"
            name="categoria-gasto"
            id="categoria-gasto"
            value={categoriaGasto}
            onChange={(e) => {
              setCategoriaGasto(e.target.value);
            }}
          >
            <option value="" disabled>
              --- Seleccione ---
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          className="bg-blue-700 uppercase font-bold py-3 px-2 hover:cursor-pointer hover:bg-blue-900 mt-3"
          value={editarGasto ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>
    </div>
  );
};

export default Modal;
