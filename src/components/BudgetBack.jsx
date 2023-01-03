import { useState } from 'react';
import { formatearCantidad } from '../helpers';
import nuevoGasto from '../assets/img/nuevo-gasto.svg';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from './Modal';
import { useEffect } from 'react';

const BudgetBack = ({
  presupuesto,
  gastosLista,
  setGastosLista,
  editarGasto,
  setEditarGasto,
  itemAEditar,
  setIsValidPresupuesto,
  setPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [submitGasto, setSubmitGasto] = useState(false);
  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidadGasto, setCantidadGasto] = useState('');
  const [categoriaGasto, setCategoriaGasto] = useState('');
  const [porcentaje, setPorcentaje] = useState('');

  const resetApp = () => {
    setPresupuesto('');
    setDisponible(0);
    setGastado(0);
    setGastosLista([]);
    setIsValidPresupuesto(false);
  };

  const handleAgregar = (setIsValidGasto) => {
    if (submitGasto || editarGasto) {
      setSubmitGasto(false);
      setNombreGasto('');
      setCantidadGasto('');
      setCategoriaGasto('');
      setIsValidGasto(false);
      setEditarGasto(false);
      return;
    }
    setSubmitGasto(true);
  };

  const llenarInfo = (itemLista) => {
    const { nombre, cantidad, categoria } = itemLista;
    setNombreGasto(nombre);
    setCantidadGasto(cantidad);
    setCategoriaGasto(categoria);
  };

  useEffect(() => {
    if (editarGasto) {
      llenarInfo(itemAEditar);
    }
  }, [editarGasto]);

  useEffect(() => {
    setDisponible(() => {
      return gastosLista.reduce(
        (presupuestoCantidad, gastoItem) =>
          presupuestoCantidad - gastoItem.cantidad,
        presupuesto
      );
    });

    setGastado(() => {
      return gastosLista.reduce(
        (total, gastoItem) => total + gastoItem.cantidad,
        0
      );
    });
  }, [gastosLista]);

  useEffect(() => {
    setPorcentaje(() => {
      return Math.trunc((gastado * 100) / presupuesto);
    });
  }, [gastado]);

  return (
    <>
      <div className="flex justify-around gap-5 flex-col md:flex-row items-center">
        <div className="w-[10rem]">
          <CircularProgressbar
            text={`${porcentaje}% Gastado`}
            styles={buildStyles({
              textSize: '12px',
              textColor: porcentaje > 100 ? 'red' : '#3b82f6',
            })}
            value={porcentaje}
          />
        </div>
        <div className=" text-xl grow-1">
          <button
            onClick={resetApp}
            className=" text-sm uppercase px-10 py-2 mb-2 rounded-lg text-center bg-pink-700 text-white "
          >
            Resetear App
          </button>
          <p className="font-bold text-primaryColor mb-3">
            Presupuesto:{' '}
            <span className="text-black font-normal">
              {formatearCantidad(presupuesto)}
            </span>
          </p>
          <p className="font-bold text-primaryColor mb-3">
            Disponible:{' '}
            <span className="text-black font-normal">
              {formatearCantidad(disponible)}
            </span>
          </p>
          <p className="font-bold text-primaryColor mb-3">
            Gastado:{' '}
            <span className="text-black font-normal">
              {formatearCantidad(gastado)}
            </span>
          </p>
        </div>
      </div>
      <Modal
        submitGasto={submitGasto}
        handleAgregar={handleAgregar}
        nombreGasto={nombreGasto}
        setNombreGasto={setNombreGasto}
        cantidadGasto={cantidadGasto}
        setCantidadGasto={setCantidadGasto}
        categoriaGasto={categoriaGasto}
        setCategoriaGasto={setCategoriaGasto}
        setGastosLista={setGastosLista}
        setSubmitGasto={setSubmitGasto}
        editarGasto={editarGasto}
        itemAEditar={itemAEditar}
        setEditarGasto={setEditarGasto}
      />
      <div>
        <img
          className="w-12 absolute right-5
        bottom-5 hover:cursor-pointer"
          src={nuevoGasto}
          onClick={handleAgregar}
        />
      </div>
    </>
  );
};

export default BudgetBack;
