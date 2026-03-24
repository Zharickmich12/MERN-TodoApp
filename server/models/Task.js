import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "El texto es obligatorio"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.userId = ret.user?.toString?.() || ret.user;
        delete ret._id;
        delete ret.__v;
        delete ret.user;
        return ret;
      },
    },
  }
);

export default mongoose.model("Task", taskSchema);
