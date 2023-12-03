import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  BookStatus : {type:String, enum:["Available", "Unavailable"]},
  quantity: { type: Number, default: 0 },
});

// [
//   {
//     book1.id,
//     quanitty,
//     status
//   }
// ]
const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
