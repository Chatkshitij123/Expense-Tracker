import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Expense} from "../models/Expense.js"
import xlsx from "xlsx";

const addExpense = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    try {
       const { icon, category, amount, date} = req.body;
       
       if (!(category || amount || date)) {
          throw new ApiError(400,"All fields are required")
       }

       const newExpense = await Expense.create({
        userId,
        icon,
        category,
        amount,
        date: new Date(date)
       });

       await newExpense.save();

       res.status(201).json(
        new ApiResponse(
            200,
            newExpense,
            "Expense field created successfully"
        )
       )
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
    
})

const getAllExpense = asyncHandler( async(req, res) => {
    const userId = req.user._id;

    try {
        const income = await Expense.find({userId}).sort({date: -1});
        res.status(201).json(
            new ApiResponse(
                200,
                income,
                "Expense details fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong while connecting to the server")
    }
})

const downloadExpenseExcel = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = expense.map((item) => (
            {
                Category: item.category,
                Amount: item.amount,
                Date: item.date,
            }
        ));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download('expense_details.xlsx')
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
})

const deleteExpense = asyncHandler( async(req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params._id);

        if (!deletedExpense) {
            throw new ApiError(404, "Expense not found");
        }
        res.status(201).json(
            new ApiResponse(
                200,
                {},
                "Expense deleted Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting the field")
    }
})

export {
    addExpense,
    getAllExpense,
    downloadExpenseExcel,
    deleteExpense
}