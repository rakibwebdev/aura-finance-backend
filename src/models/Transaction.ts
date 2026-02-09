import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    name: string;
    amount: number;
    category: string;
    barcode?: string;
    date: Date;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        barcode: { type: String },
        date: { type: Date, default: Date.now },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
