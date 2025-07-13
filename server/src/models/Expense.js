import mongoose, {Schema} from "mongoose";


const expenseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        icon: {
            type: String
        },
        category: {
            type: String, //ex - Salary, Freelance,etc
            required: true
        },
        amount: {
            type: Number,
            default: 0,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const Expense = mongoose.model("Expense",expenseSchema);