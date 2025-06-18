import { TransactionItem } from "@/components/transaction-item";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import axios from "@/utils/api/axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Transactions() {
  const { accessToken, idToken } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Try restoring from sessionStorage first (optional, only for recent view)
    const sessionTransactions = sessionStorage.getItem("recentTransactions");
    if (sessionTransactions) {
      setTransactions(JSON.parse(sessionTransactions));
    }
  }, []);

  useEffect(() => {
    if (!accessToken || !idToken) return;

    const fetchTransactions = async () => {
      try {
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

        setTransactions(combined);
      } catch (err) {
        toast.error("Failed to load transactions from Drive");
        console.error(err);
      }
    };

    fetchTransactions();
  }, [accessToken, idToken]);

  if (!accessToken || !idToken) {
    return <div className="p-4">Loading transactions...</div>;
  }

  return (
    <Card className="lg:col-span-2 bg-white">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transactions</h3>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {transactions.slice(0, 3).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
