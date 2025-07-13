import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Income } from "../models/Income.js"
import xlsx from "xlsx";

const addIncome = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    try {
       const { icon, source, amount, date} = req.body;
       
       if (!(source || amount || date)) {
          throw new ApiError(400,"All fields are required")
       }

       const newIncome = await Income.create({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
       });

       await newIncome.save();

       res.status(201).json(
        new ApiResponse(
            200,
            newIncome,
            "Income field created successfully"
        )
       )
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
    
})

const getAllIncome = asyncHandler( async(req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.status(201).json(
            new ApiResponse(
                200,
                income,
                "Income details fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong while connecting to the server")
    }
})

const downloadIncomeExcel = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = income.map((item) => (
            {
                Source: item.source,
                Amount: item.amount,
                Date: item.date,
            }
        ));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download('income_details.xlsx')
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
})

const deleteIncome = asyncHandler( async(req, res) => {
    try {
        const deletedIncome = await Income.findByIdAndDelete(req.params._id);

        if (!deletedIncome) {
            throw new ApiError(404, "Income not found");
        }
        res.status(201).json(
            new ApiResponse(
                200,
                {},
                "Income deleted Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting the field")
    }
})

export {
    addIncome,
    getAllIncome,
    downloadIncomeExcel,
    deleteIncome
}