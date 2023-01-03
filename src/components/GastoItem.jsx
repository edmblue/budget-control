import { formatearCantidad } from '../helpers';
import iconoAhorro from '../assets/img/icono_ahorro.svg';
import iconoCasa from '../assets/img/icono_casa.svg';
import iconoComida from '../assets/img/icono_comida.svg';
import iconoGastos from '../assets/img/icono_gastos.svg';
import iconoOcio from '../assets/img/icono_ocio.svg';
import iconoSalud from '../assets/img/icono_salud.svg';
import iconoSuscripciones from '../assets/img/icono_suscripciones.svg';

const GastoItem = ({ itemLista, categoriaFiltroGasto }) => {
  const imgCategorias = {
    ahorro: iconoAhorro,
    casa: iconoCasa,
    comida: iconoComida,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones,
  };

  const { nombre, cantidad, categoria, fecha } = itemLista;
  return (
    <div
      className={`font-bold flex items-center justify-between w-full mb-4  ${
        categoriaFiltroGasto === 'full'
          ? 'block'
          : categoriaFiltroGasto === categoria
          ? 'block'
          : 'hidden'
      }`}
    >
      <div className="flex items-center gap-3">
        <div>
          {' '}
          <img className="w-[7rem]" src={imgCategorias[categoria]} />
        </div>
        <div>
          <p className="uppercase">{categoria} </p>
          <p className="text-2xl">{nombre} </p>
          <p>
            Agregado el: <span className="font-normal">{fecha} </span>{' '}
          </p>
        </div>
      </div>
      <div>
        <p className="text-lg md:text-2xl">{formatearCantidad(cantidad)}</p>
      </div>
    </div>
  );
};

export default GastoItem;
