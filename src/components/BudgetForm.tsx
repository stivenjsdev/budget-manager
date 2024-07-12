import { ChangeEvent, useMemo, useState } from "react";

function BudgetForm() {
  const [budget, setBudget] = useState<number | string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setBudget(!isNaN(value) ? value : "");
  };

  const isValid = useMemo(() => {
    return typeof budget === "number"
      ? isNaN(budget) || budget <= 0
        ? false
        : true
      : false;
  }, [budget]);

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>

        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={!isValid}
      />
    </form>
  );
}

export default BudgetForm;