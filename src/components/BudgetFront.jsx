import Error from './Error';

const BudgetFront = ({
  presupuesto,
  setPresupuesto,
  error,
  setError,
  setIsValidPresupuesto,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (presupuesto <= 0) {
      setError(true);
      return;
    }

    setError(false);
    setIsValidPresupuesto(true);
  };

  return (
    <div className="py-5 px-20 text-center">
      <h2 className="text-3xl text-primaryColor">Definir Presupuesto</h2>
      <form onSubmit={handleSubmit}>
        {error && <Error>Por favor ingrese una cantidad valida</Error>}
        <div>
          <input
            className="mt-3 w-full bg-slate-200 px-4 py-2 uppercase "
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => {
              setPresupuesto(Number(e.target.value));
            }}
          />
        </div>
        <input
          className="bg-blue-700 uppercase w-full mt-3 py-1 text-white hover:bg-blue-500 cursor-pointer"
          type="submit"
          value="Añadir"
        />
      </form>
    </div>
  );
};

export default BudgetFront;
