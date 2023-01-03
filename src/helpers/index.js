export const formatearCantidad = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generarId = () => {
  const random = Math.random().toString(36).slice(2);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

export const registrarFecha = () => {
  const fecha = new Date();
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };

  return fecha.toLocaleString('es-ES', opciones);
};
