const categoryIcons = {
  food: "🍽️",
  transport: "🚗",
  shopping: "🛍️",
  entertainment: "🎬",
  bills: "📄",
  healthcare: "🏥",
  education: "📚",
  freelance: "💼",
  salary: "💰",
  other: "📦",
};

const colors = {
  mint: "#4ade80",
  coral: "#f87171",
};

export function TransactionItem({ transaction }) {
  const iconColor = transaction.type === "income" ? colors.mint : colors.coral;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e2e8f0] hover:bg-gray-100 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: iconColor }}
        >
          <span className="text-lg">
            {categoryIcons[transaction.category] || "📦"}
          </span>
        </div>
        <div>
          <p className="font-medium text-[#1e293b]">
            {transaction.description}
          </p>
          <p className="text-sm text-[#64748b] capitalize">
            {transaction.category} •{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <span
        className={`font-bold text-lg ${
          transaction.type === "income" ? "text-[#10b981]" : "text-[#ef4444]"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount.toFixed(2) + " PKR"}
      </span>
    </div>
  );
}
