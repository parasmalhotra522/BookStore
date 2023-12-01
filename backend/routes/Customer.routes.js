import express from "express";
import Customer from "../models/Customer.model.js";
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from "crypto";
const app = express.Router();
const jwt = jsonwebtoken;
import { authenticateToken } from "../auth/auth.js";

// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString('hex'); // 32 bytes for a strong secret
// };
// const secretKey = generateSecretKey();


app.get("/", (req, res) => {
    res.status(200).send("Hello Customers");
});

app.post("/register", async(req, res) => {
    try {
        const {firstName, lastName, emailId, password, role} = req.body;
        console.log("Check body revceived", req.body);
       
    if (!(emailId && password && firstName && lastName)) {
        res.status(400).send("All inputs are required");
      }
   
      // --- if user exists --- throw error that user already exists
      if (await Customer.findOne({emailId:emailId})) {
    //    console.log("CHECK IF CUSTOMER EXIST" , await Customer.find({emailId}));
        return res.status(409).send({message: "User Already Exist, Please Login or Register with different credentials"});
      }

      // else create the customer account
      const encryptedPassword = await bcrypt.hash(password, 10);
     
      // create method would craete a new object of Customer and call save() method to save collection into the database
      const customer = await Customer.create({
          firstName,
          lastName,
          emailId: emailId.toLowerCase(), 
          password: encryptedPassword,
          role:role,
          
        });
          // Create token
        const token = jwt.sign(
            {
                customerId: customer._id,
                emailId: customer.emailId,

            },
           process.env.SECRET_KEY,
            {
            expiresIn: "1h",
            }
        );
        customer.token = token;
        console.log("CHECKCK cstomer", customer);
        
        res.status(201).send({
          message:"User created Successfully" , 
          customer:customer
        });
     } catch (err) {
       console.error(err);
       res.status(403).send({
        message:"Error in registering new User \n Please try Again after some time" , 
      });
    }
});




// ---------- Login -----

app.post("/login", async (req, res) => {
    try {
      // Extract user input
      const { emailId, password } = req.body;
        console.log("In login checking credentials", req.body);
      
        // Validate user input
      if (!(emailId && password)) {
        res.status(400).send({message : "All inputs are required"});
      }
      // Validate if user exist in our database
      const user = await Customer.findOne({ emailId });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        console.log("Im checking login", user);
        
        const token = jwt.sign(
          { user_id: user._id,
             emailId },
            process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
  
        // save user token
        user.token = token;
  
        // send back the customer object with token...
        res.status(200).json({message:"LogIn Successfully", customer : user});
      }
      else {
      res.status(400).send({message:"Invalid Credentials!! Please try again with authorized credentials"});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({message:"Internal Server Error! \n Please try again after some time"});
    }
    // Our register logic ends here
  });
  

// app.use(express.json());
// app.use('/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});




export default app;

