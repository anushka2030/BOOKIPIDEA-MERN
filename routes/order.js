const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Create an array to store all order promises
        const orderPromises = order.map(async (orderData) => {
            // Create new order
            const newOrder = new Order({ user: id, book: orderData._id });
            const saveOrder =  await newOrder.save();
            return saveOrder._id;
        });

        // Wait for all orders to be created
        const orderBookIds = await Promise.all(orderPromises);

        // Update user document - add all orders and clear cart in one operation
        await User.findByIdAndUpdate(id, {
            $push: { orders: { $each: orderBookIds } },
            $set: { cart: [] }  // Clear the entire cart
        });

        return res.json({
            status: "Success",
            message: "Orders Placed Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error Occurred!" });
    }
});

router.get('/get-order-history', authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        
        if (!id) {
            return res.status(400).json({
                status: "Error",
                message: "User ID is required"
            });
        }

        const userData = await User.findById(id);
        
        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        if (!userData.orders) {
            return res.json({
                status: "Success",
                data: []
            });
        }

        const populatedUser = await User.findById(id)
            .populate({
                path: "orders",
                populate: {path: "book"}
            });

        if (!populatedUser.orders) {
            return res.json({
                status: "Success",
                data: []
            });
        }

        const ordersData = populatedUser.orders.reverse();
        
        return res.json({
            status: "Success",
            data: ordersData
        });
    }
    catch (error){
        console.log("Error in get-order-history:", error);
        return res.status(500).json({
            status: "Error",
            message: error.message || "An error occurred!"
        });
    }
});
// get All Orders ---> Admin
router.get('/get-all-orders',authenticateToken, async(req,res)=>{
    try{
       const userData= await Order.find()
       .populate({
        path: "book",
       })
       .populate({
        path: "user",
       })
       .sort({createdAt: -1});
       return res.json({
        status:"Success",
        data:userData,
       });
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message:"An error Occurred!"});
    }
});

//Update Status

router.put("/update-status/:id",authenticateToken, async(req,res)=>{
    try{
      const {id} = req.params;
      await Order.findByIdAndUpdate(id,{status: req.body.status});
      return res.json({
        status:"Success",
        message:"Status Updated Successfully",
      });
    }
    catch(error){
     console.log(error);
     return res.status(500).json({message:"An error occurred!"});
    }
});


module.exports = router;
