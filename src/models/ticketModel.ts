import mongoose from "mongoose";

export interface ITicket extends Document {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo?: mongoose.Schema.Types.ObjectId;
  createdBy?: mongoose.Schema.Types.ObjectId;
  updatedBy?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model<ITicket>("tickets", ticketSchema);

export default Ticket;
