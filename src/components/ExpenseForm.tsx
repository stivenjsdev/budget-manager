import { ChangeEvent, useState } from "react";
import { categories } from "../data/categories";
import { DraftExpense } from "../types";

function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: "" as unknown as number,
    expenseName: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

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

  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-blue-500 border-b-4 py-2">
        Nuevo Gasto
      </legend>

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
          Categoria:
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
        value="Registrar Gasto"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
}

export default ExpenseForm;
