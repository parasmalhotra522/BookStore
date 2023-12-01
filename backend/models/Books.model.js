import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    // bookId:{type:String, required:true},
    bookName: { type: String, required: true},
    bookCategory : { type: String, required: true},
    bookAuthor : { type: String, required: true },
    bookImage: {type: String},
    bookDescription : {type:String}
});
const Book = mongoose.model('Book', bookSchema);

export default Book;