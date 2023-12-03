import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    // bookId:{type:String, required:true},
    bookName: { type: String, required: true},
    bookCategory : { type: String, required: true},
    bookAuthor : { type: String, required: true },
    bookImage: {type: String},
    bookDescription : {type:String},
    bookPrice:{type:Number, required:true},
    
    // inventory : {mongoose.Schema.Types.ObjectId}
    
    // bookQuantity : {type:Number, required: true} 
    // If purchased succesful then decrease the bookQuantity from inventory, if zero out of stock, set status unavailable
    //

});
const Book = mongoose.model('Book', bookSchema);

export default Book;