import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { DraftExpense } from "../types";
import ErrorMessage from "./ErrorMessage";

const initialState: DraftExpense = {
  amount: "" as unknown as number,
  expenseName: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
};

function ExpenseForm() {
  const { dispatch, state } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.find(
        (currentExpense) => currentExpense.id === state.editingId
      );
      setExpense(editingExpense!);
    }
  }, [state.editingId]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const isAmountField = name === "amount";
    setExpense((prev) => ({
      ...prev,
      [name]: isAmountField ? +value : value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // validar
    if (Object.values(expense).includes("") || expense.amount <= 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Agregar o actualizar gasto
    if (state.editingId) {
      dispatch({
        type: "UPDATE_EXPENSE",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "ADD_EXPENSE", payload: { expense } });
    }

    // reiniciar el formulario
    setError("");
    setExpense(initialState);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-blue-500 border-b-4 py-2">
        {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="bg-slate-100 p-2 w-full"
          value={expense.date}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
}

export default ExpenseForm;
