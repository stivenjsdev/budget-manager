import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const formatedDate = useMemo(() => formatDate(expense.date), [expense])
  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div></div>

      <div>
        <p className="text-base">{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">{formatedDate}</p>
      </div>

      <AmountDisplay
        amount={expense.amount}
      />
    </div>
  );
}

export default ExpenseDetail;
