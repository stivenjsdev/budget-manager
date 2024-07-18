import { Expense } from "../types";

type ExpenseDetailProps = {
  expense: Expense;
}

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  return (
    <div>ExpenseDetail</div>
  )
}

export default ExpenseDetail