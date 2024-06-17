interface ChangeProps {
  change: number;
}

export default function Change({ change }: ChangeProps) {
  return (
    <div
      className={`w-full text-right ${change > 0 ? "text-positive" : "text-negative"}`}
    >
      {change > 0 ? "+ " : "- "}
      {Math.abs(change).toFixed(2)}
    </div>
  );
}
