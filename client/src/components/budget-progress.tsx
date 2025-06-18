export function BudgetProgressItem({ category, spent, budget, color }) {
  const percentage = (spent / budget) * 100;
  const isOverBudget = percentage > 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#1e293b]">{category}</span>
        <span
          className={`text-sm font-bold ${
            isOverBudget ? "text-[#ef4444]" : "text-[#64748b]"
          }`}
        >
          ${spent} / ${budget}
        </span>
      </div>
      <div className="w-full bg-[#e2e8f0] rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: isOverBudget ? "#f87171" : color,
          }}
        ></div>
      </div>
    </div>
  );
}
