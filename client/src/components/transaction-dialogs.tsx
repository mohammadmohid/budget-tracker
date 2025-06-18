import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import axios from "../utils/api/axios";
import { toast } from "sonner";

export function AddExpenseDialog({
  onSubmit,
  className = null,
  children = null,
}) {
  const { accessToken, idToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0.0,
    category: "",
    description: "",
    date: new Date(),
    paymentMethod: "card",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const expenseCategories = [
    { value: "food", label: "Food & Dining", icon: "🍽️" },
    { value: "transport", label: "Transportation", icon: "🚗" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "entertainment", label: "Entertainment", icon: "🎬" },
    { value: "bills", label: "Bills & Utilities", icon: "📄" },
    { value: "healthcare", label: "Healthcare", icon: "🏥" },
    { value: "education", label: "Education", icon: "📚" },
    { value: "other", label: "Other", icon: "📦" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken || !idToken) {
      toast.error("Missing authentication tokens");
      return;
    }

    setIsSubmit(true);
    setLoading(true);

    try {
      const expenseData = {
        ...formData,
        amount: formData.amount,
        date: formData.date.toISOString(),
      };

      await axios.post("/expenses", expenseData, {
        headers: {
          "Authorization": `Bearer ${idToken}`,
          "x-google-access-token": accessToken,
        },
      });
      toast.success("Expense added successfully!");

      onSubmit?.({ ...expenseData, type: "expense" });
      setFormData({
        amount: 0.0,
        category: "",
        description: "",
        date: new Date(),
        paymentMethod: "card",
      });
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            className={`bg-[#f87171] hover:bg-[#ef4444] text-white cursor-pointer ${className}`}
          >
            <Plus className="w-4 h-4" />
            Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💸</div>
          <h2 className="text-2xl font-bold text-[#1e293b]">Add Expense</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (PKR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              className="text-lg font-semibold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(formData.date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                />
              </PopoverContent>
            </Popover>
          </div>

          {isSubmit && (
            <div className="space-y-2">
              <div className="bg-yellow-100 rounded-md p-2 text-yellow-600 text-sm">
                Note: Backend service spins down with inactivity, which can
                delay requests by 50 seconds or more. Currently temporary until
                a reliable source of income is confirmed as I'm a student.
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData({ ...formData, paymentMethod: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">💵 Cash</SelectItem>
                <SelectItem value="card">💳 Card</SelectItem>
                <SelectItem value="bank">🏦 Bank Transfer</SelectItem>
                <SelectItem value="digital">📱 Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#f87171] hover:bg-[#ef4444] text-white"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Expense"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddIncomeDialog({
  onSubmit,
  className = null,
  children = null,
}) {
  const { accessToken, idToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0.0,
    source: "",
    description: "",
    date: new Date(),
    incomeType: "salary",
  });

  const incomeCategories = [
    { value: "salary", label: "Salary", icon: "💰" },
    { value: "freelance", label: "Freelance", icon: "💼" },
    { value: "business", label: "Business", icon: "🏢" },
    { value: "investment", label: "Investment", icon: "📈" },
    { value: "gift", label: "Gift", icon: "🎁" },
    { value: "other", label: "Other", icon: "💵" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken || !idToken) {
      toast.error("Missing authentication tokens");
      return;
    }

    setLoading(true);

    try {
      const incomeData = {
        amount: formData.amount,
        source: formData.source,
        description: formData.description,
        date: formData.date.toISOString(),
        incomeType: formData.source,
      };

      await axios.post("/income", incomeData, {
        headers: {
          "Authorization": `Bearer ${idToken}`,
          "x-google-access-token": accessToken,
        },
      });

      toast.success("Income added successfully!");

      onSubmit?.({ ...incomeData, type: "income" });
      setFormData({
        amount: 0.0,
        source: "",
        description: "",
        date: new Date(),
        incomeType: "salary",
      });
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            className={`bg-[#4ade80] hover:bg-[#22c55e] text-white cursor-pointer ${className}`}
          >
            <Plus className="w-4 h-4" />
            Income
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💵</div>
          <h2 className="text-2xl font-bold text-[#1e293b]">Add Income</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (PKR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              className="text-lg font-semibold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value) =>
                setFormData({ ...formData, source: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select income source" />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Source of income"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#4ade80] hover:bg-[#22c55e] text-white"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Income"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
