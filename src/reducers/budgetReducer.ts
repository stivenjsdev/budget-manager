import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "ADD_BUDGET"; payload: { budget: number } }
  | { type: "SHOW_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "ADD_EXPENSE"; payload: { expense: DraftExpense } }
  | { type: "REMOVE_EXPENSE"; payload: { id: string } }
  | { type: "GET_EXPENSE_BY_ID"; payload: { id: string } }
  | { type: "UPDATE_EXPENSE"; payload: { expense: Expense } }
  | { type: "RESET_APP" };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};

const localStorageExpenses = (): Expense[] => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

const localStorageBudget = (): number => {
  const budget = localStorage.getItem("budget");
  return budget ? +budget : 0;
};

export const initialState: BudgetState = {
  budget: localStorageBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    id: uuidv4(),
    ...draftExpense,
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "ADD_BUDGET") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "SHOW_MODAL") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      modal: false,
      editionId: "",
    };
  }

  if (action.type === "ADD_EXPENSE") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  if (action.type === "REMOVE_EXPENSE") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === "GET_EXPENSE_BY_ID") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "UPDATE_EXPENSE") {
    return {
      ...state,
      expenses: state.expenses.map((currentExpense) =>
        currentExpense.id === action.payload.expense.id
          ? action.payload.expense
          : currentExpense
      ),
      editingId: "",
      modal: false,
    };
  }

  if (action.type === "RESET_APP") {
    return {
      ...state,
      budget: 0,
      modal: false,
      expenses: [],
      editingId: "",
    };
  }

  return state;
};
