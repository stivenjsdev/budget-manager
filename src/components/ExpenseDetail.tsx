import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();

  const formattedDate = useMemo(() => formatDate(expense.date), [expense]);

  const categoryInfo = useMemo(
    () => categories.find((cat) => cat.id === expense.category),
    [expense.category]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({
            type: "GET_EXPENSE_BY_ID",
            payload: { id: expense.id },
          })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({
            type: "REMOVE_EXPENSE",
            payload: { id: expense.id },
          })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        // maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg px-0 py-4 w-full border-b border-gray-200 flex gap-5 items-center md:p-10">
          <div>
            <img
              src={`/icono_${categoryInfo!.icon}.svg`}
              alt="icono gasto"
              className="w-20 md:w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500 md:text-base">
              {categoryInfo!.name}
            </p>
            <p className="text-xs md:text-sm">{expense.expenseName}</p>
            <p className="text-slate-600 text-xs md:text-sm">{formattedDate}</p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
