import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { useBudget } from "./hooks/useBudget";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-64">
        <h1 className="uppercase font-black text-center text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {!isValidBudget ? <BudgetForm /> : <BudgetTracker />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">

          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
