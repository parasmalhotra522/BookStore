import mongoose from "mongoose";
import validator from "validator";
import jsonwebtoken  from "jsonwebtoken";
import Book from "./Books.model.js";

const jwt = jsonwebtoken;
const customerSchema  = new mongoose.Schema({
    firstName: { type:String,trim: true,  required:true },
    lastName: { type:String,trim: true,  required:true },
    emailId: { 
        type: String,
        trim: true, 
        required: true, 
        lowercase:true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: { 
        type: String, 
        required: true,
     },
     role: { type: String, 
        enum: ['customer', 'admin'], 
        default: 'customer' 
    },
    cart: [{
      bookId: {type:mongoose.Schema.Types.ObjectId, ref:'Book'},
        quantity: {
          type: Number,
          default: 0,
      },
       
    }],
    token: { type: String}


});


customerSchema.methods.generateAuthToken = async function () {
    const customer = this;
  
    // Check if `this` is a valid object
    if (!customer || !customer._id) {
      throw new Error('Invalid customer object');
    }
  
    const token = jwt.sign(
      { _id: customer._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  
 customer.tokens = customer.tokens.concat({ token });

await customer.save();

return token;
  };
  




customerSchema.statics.findCustomer = async (email, password) => {
    const customer = await Customer.findOne({ email });
  
    if (!customer) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }
    return customer;
  }


export const Customer = mongoose.model("Customer", customerSchema);
export default Customer;