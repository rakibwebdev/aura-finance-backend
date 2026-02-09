import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    icon?: string;
    color?: string;
    budgetLimit: number;
    spent: number;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            default: "pricetag",
        },
        color: {
            type: String,
            default: "#6366f1",
        },
        budgetLimit: {
            type: Number,
            default: 0,
            min: 0,
        },
        spent: {
            type: Number,
            default: 0,
            min: 0,
        },
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

// Compound index to ensure unique category name per user
CategorySchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.model<ICategory>("Category", CategorySchema);
