import mongoose, {Schema} from "mongoose";


const incomeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        icon: {
            type: String
        },
        source: {
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

export const Income = mongoose.model("Income",incomeSchema);