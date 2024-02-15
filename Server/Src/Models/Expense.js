const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  splitwiseId: { type: Number, required: true, unique: true },
  groupId: { type: Number, required: true },
  friendshipId: { type: Number, default: null },
  expenseBundleId: { type: Number, default: null },
  description: { type: String, required: true },
  repeats: { type: Boolean, default: false },
  repeatInterval: { type: Number, default: null },
  emailReminder: { type: Boolean, default: false },
  emailReminderInAdvance: { type: Number, default: -1 },
  nextRepeat: { type: Date, default: null },
  details: { type: String, default: null },
  commentsCount: { type: Number, default: 0 },
  payment: { type: Boolean, default: false },
  creationMethod: { type: String, default: null },
  transactionMethod: { type: String, required: true },
  transactionConfirmed: { type: Boolean, default: false },
  transactionId: { type: Number, default: null },
  transactionStatus: { type: String, default: null },
  cost: { type: Number, required: true },
  currencyCode: { type: String, required: true },
  repayments: [{ type: mongoose.Schema.Types.Mixed }], // Adjust as needed
  date: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  createdBy: {
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    picture: { type: mongoose.Schema.Types.Mixed },
    customPicture: { type: Boolean, default: false },
  },
  updatedAt: { type: Date, required: true },
  updatedBy: {
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    picture: { type: mongoose.Schema.Types.Mixed },
    customPicture: { type: Boolean, default: false },
  },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: Number, default: null },
  category: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  receipt: {
    large: { type: String, default: null },
    original: { type: String, default: null },
  },
  users: [{ type: mongoose.Schema.Types.Mixed }], // Adjust as needed
},
{
  timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
