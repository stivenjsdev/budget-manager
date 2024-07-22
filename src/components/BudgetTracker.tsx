import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

function BudgetTracker() {
  const { state, totalExpenses, remainingBudget } = useBudget();

  const percentage = useMemo(
    () => +(totalExpenses / state.budget * 100).toFixed(1),
    [totalExpenses]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* <img src="/grafico.jpg" alt="Grafica de gastos" /> */}
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% Gastado`}
          styles={buildStyles({
            pathColor: percentage >= 80 ? "#db2777" :"#3b82f6",
            trailColor: "#f5f5f5",
            textColor: percentage >= 80 ? "#db2777" :"#3b82f6",
            textSize: "0.6rem",
          })}
          className="w-80 h-80 md:w-80 md:h-80"
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg active:scale-95"
        >
          Resetear App
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}

export default BudgetTracker;
