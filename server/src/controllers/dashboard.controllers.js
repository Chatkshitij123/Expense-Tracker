import { Income } from "../models/Income.js";
import { Expense } from "../models/Expense.js";
import { Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(userId);

    // Fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    // Fetch total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // Fetch last 5 transactions (income + expenses)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: "income"
      })),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: "expense"
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Send response
    res.status(200).json(
      new ApiResponse(
        200,
        {
          totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
          totalIncome: totalIncome[0]?.total || 0,
          totalExpense: totalExpense[0]?.total || 0,
          last30DaysExpenses: {
            total: expenseLast30Days,
            transactions: last30DaysExpenseTransactions
          },
          last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions
          },
          recentTransactions: lastTransactions
        },
        "Data fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Server Error");
  }
});

