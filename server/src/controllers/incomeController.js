import * as incomeService from "../services/incomeService.js";

export async function postIncome(req, res) {
  const { amount, date, category, notes, expected } = req.body;
  const { uid } = req.user;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const incomeId = await incomeService.addIncome(uid, {
    amount,
    date: new Date(date),
    category,
    notes,
    expected: !!expected,
  });

  res.status(201).json({ message: "Income added", id: incomeId });
}

export async function getIncomes(req, res) {
  const { uid } = req.user;
  const incomes = await incomeService.getIncomeByUser(uid);
  res.json(incomes);
}
