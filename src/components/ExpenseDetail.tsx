import { useMemo } from "react";
import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const formatedDate = useMemo(() => formatDate(expense.date), [expense]);
  const categoryInfo = useMemo(
    () => categories.find((cat) => cat.id === expense.category),
    [expense.category]
  );
  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>
        <img
          src={`/icono_${categoryInfo!.icon}.svg`}
          alt="icono gasto"
          className="w-20"
        />
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-sm font-bold uppercase text-slate-500">
          {categoryInfo!.name}
        </p>
        <p className="text-base">{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">{formatedDate}</p>
      </div>

      <AmountDisplay amount={expense.amount} />
    </div>
  );
}

export default ExpenseDetail;
