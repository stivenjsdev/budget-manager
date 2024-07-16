import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBudget } from "../hooks/useBudget";
import ExpenseForm from "./ExpenseForm";

function ExpenseModal() {
  const { state, dispatch } = useBudget();
  return (
    <>
      {/* Button to deploy the modal */}
      <div className="fixed bottom-5 right-5 flex items-center justify-center">
        <button type="button" onClick={() => dispatch({ type: "SHOW_MODAL" })}>
          <PlusCircleIcon className="w-16 h-16 text-blue-600 rounded-full" />
        </button>
      </div>

      {/* Modal */}
      <Dialog
        open={state.modal}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/75
          duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-6 shadow-xl text-left align-middle
            duration-500 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* content */}
            <ExpenseForm />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ExpenseModal;
