import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    // Add other order properties as needed
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
