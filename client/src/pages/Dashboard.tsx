import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Frown, Target, TrendingDown } from "lucide-react";
import {
  AddExpenseDialog,
  AddIncomeDialog,
} from "@/components/transaction-dialogs";
import { TransactionItem } from "@/components/transaction-item";
import { BudgetProgressItem } from "@/components/budget-progress";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "@/utils/api/axios";
import { toast } from "sonner";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "@/components/skeleton";

const colors = {
  mint: "#4ade80",
  peach: "#fb923c",
  lavender: "#a78bfa",
  skyBlue: "#60a5fa",
  coral: "#f87171",
  teal: "#2dd4bf",
};

export default function DashboardPage() {
  const { accessToken, idToken } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const monthlyData = getMonthlySummary(transactions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken || !idToken) return;

    const sessionTransactions = sessionStorage.getItem("recentTransactions");
    if (sessionTransactions) {
      setTransactions(JSON.parse(sessionTransactions));
      return;
    }

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const [expensesRes, incomeRes] = await Promise.all([
          axios.get("/expenses", {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "x-google-access-token": accessToken,
            },
          }),
          axios.get("/income", {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "x-google-access-token": accessToken,
            },
          }),
        ]);

        const expenses = expensesRes.data.map((e) => ({
          ...e,
          type: "expense",
        }));
        const incomes = incomeRes.data.map((i) => ({
          ...i,
          type: "income",
        }));

        const combined = [...expenses, ...incomes].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // const recentTransactions = combined.slice(0, 3);

        sessionStorage.setItem("recentTransactions", JSON.stringify(combined));

        setTransactions(combined);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load transactions from Drive");
        console.error(err);
      }
    };

    fetchTransactions();
  }, [accessToken, idToken]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: uuidv4(),
      type: transaction.type,
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions((prev) =>
      [newTransaction, ...prev].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = totalIncome - totalExpenses;
  const budgetUsed = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  return (
    <main className="flex-1">
      <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-10 p-10 flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <p className="text-[#64748b] mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-end max-sm:w-full gap-2">
          <AddExpenseDialog
            onSubmit={addTransaction}
            className={"max-sm:flex-1"}
          />
          <AddIncomeDialog
            onSubmit={addTransaction}
            className={"max-sm:flex-1"}
          />
        </div>
      </div>

      <div className="space-y-6 p-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Income"
            value={`PKR ${totalIncome.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="+12%"
            trendUp={true}
            color={colors.mint}
          />
          <StatCard
            title="Total Expenses"
            value={`PKR ${totalExpenses.toLocaleString()}`}
            icon={<TrendingDown className="w-5 h-5" />}
            trend="+8%"
            trendUp={false}
            color={colors.coral}
          />
          <StatCard
            title="Savings"
            value={`PKR ${savings.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="+25%"
            trendUp={true}
            color={colors.teal}
          />
          <StatCard
            title="Budget Used"
            value={`${budgetUsed.toFixed(1)}%`}
            icon={<Target className="w-5 h-5" />}
            trend="On track"
            trendUp={true}
            color={colors.lavender}
          />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="bg-white border border-[#e2e8f0] ">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <AddExpenseDialog onSubmit={addTransaction}>
                  <QuickActionButton
                    icon="➕"
                    label="Add Expense"
                    color={colors.coral}
                    onClick={undefined}
                  />
                </AddExpenseDialog>
                <AddIncomeDialog onSubmit={addTransaction}>
                  <QuickActionButton
                    icon="💰"
                    label="Add Income"
                    color={colors.mint}
                    onClick={undefined}
                  />
                </AddIncomeDialog>
                <NavLink to="/budgets">
                  <QuickActionButton
                    icon="🎯"
                    label="Set Budget"
                    color={colors.skyBlue}
                    onClick={undefined}
                  />
                </NavLink>
                <NavLink to="/analytics">
                  <QuickActionButton
                    icon="📊"
                    label="View Report"
                    color={colors.lavender}
                    onClick={undefined}
                  />
                </NavLink>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2 bg-white border border-[#e2e8f0] ">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                {
                  <NavLink
                    to="/transactions"
                    onClick={(e) => {
                      if (transactions.length === 0 && !loading) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={transactions.length === 0}
                    >
                      View All
                    </Button>
                  </NavLink>
                }
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {/* Empty Handling */}
                {transactions.length === 0 && !loading && (
                  <div className="flex gap-2">
                    <Frown className="text-gray-600" />
                    <span className="italic text-gray-600">
                      Wow, very much empty.
                    </span>
                  </div>
                )}

                {/* Loading Animation */}
                {loading && (
                  <div className="space-y-3">
                    <Skeleton className="w-full h-20 rounded-md" />
                    <Skeleton className="w-full h-20 rounded-md" />
                    <Skeleton className="w-full h-20 rounded-md" />
                  </div>
                )}
                {transactions.slice(0, 3).map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-[#e2e8f0] ">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
              {transactions.length === 0 && !loading && (
                <div className="flex gap-2">
                  <Frown className="text-gray-600" />
                  <span className="italic text-gray-600">
                    Add Expense/Income for insights.
                  </span>
                </div>
              )}
              {transactions.length != 0 && (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 0, right: 10, left: 30, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="incomeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.mint}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.mint}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="expenseGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.coral}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.coral}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="day"
                      stroke="#6B7280"
                      label={{
                        value: "Date",
                        position: "insideBottomRight",
                        offset: -10,
                        style: { fill: "#64748b", fontSize: 12 },
                      }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      label={{
                        value: "Total (PKR)",
                        position: "insideLeft",
                        angle: -90,
                        offset: -25,
                        style: { fill: "#64748b", fontSize: 12 },
                      }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke={colors.mint}
                      fillOpacity={1}
                      fill="url(#incomeGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke={colors.coral}
                      fillOpacity={1}
                      fill="url(#expenseGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border border-[#e2e8f0] ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Budget Progress</h3>
                <NavLink to="/budgets">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </NavLink>
              </div>
              <div className="space-y-4">
                <BudgetProgressItem
                  category="Food & Dining"
                  spent={450}
                  budget={500}
                  color={colors.lavender}
                />
                <BudgetProgressItem
                  category="Transportation"
                  spent={200}
                  budget={300}
                  color={colors.teal}
                />
                <BudgetProgressItem
                  category="Entertainment"
                  spent={150}
                  budget={200}
                  color={colors.skyBlue}
                />
                <BudgetProgressItem
                  category="Shopping"
                  spent={300}
                  budget={250}
                  color={colors.coral}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, trend, trendUp, color }) {
  return (
    <Card className="bg-white border border-[#e2e8f0] ">
      <CardContent className="relative p-4 self-center gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full" style={{ backgroundColor: color }}>
            <div className="text-white">{icon}</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#64748b]">{title}</h4>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 ml-4 text-xs font-medium ${
            trendUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      </CardContent>
    </Card>
  );
}

type QuickActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick?: () => void;
};

export const QuickActionButton = React.forwardRef<
  HTMLButtonElement,
  QuickActionButtonProps
>(({ icon, label, color, onClick }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className="h-20 flex-col gap-2 border hover: transition-all duration-200 w-full"
    style={{
      backgroundColor: `${color}10`,
      borderColor: `${color}30`,
      color: color,
    }}
    onClick={onClick}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </Button>
));

QuickActionButton.displayName = "QuickActionButton";

function getMonthlySummary(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const daysMap = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      const day = date.getDate(); // 1–31 days
      const key = String(day).padStart(2, "0");

      if (!daysMap[key]) {
        daysMap[key] = { day: key, income: 0, expenses: 0 };
      }

      if (t.type === "income") {
        daysMap[key].income += t.amount;
      } else if (t.type === "expense") {
        daysMap[key].expenses += t.amount;
      }
    }
  });

  // Sort days numerically and return as array
  return Object.values(
    daysMap as Record<
      string,
      {
        day: string;
        income: number;
        expenses: number;
      }
    >
  ).sort((a, b) => Number(a.day) - Number(b.day));
}
