import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

function AmountDisplay({ label, amount }: AmountDisplayProps) {
  const formattedAmount = formatCurrency(amount).substring(0, formatCurrency(amount).length - 3);
  return (
    <p className="text-2xl text-blue-600 font-semibold">
      {label && `${label}: `}
      <span className="font-bold text-black">{formattedAmount}</span>
    </p>
  );
}

export default AmountDisplay;
