const router = require("express").Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const { authenticateToken } = require("./userAuth");

// Add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(bookid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookInCart = userData.cart.some(book => book.toString() === bookid);
        if (isBookInCart) {
            return res.json({
                status: "Success",
                message: "Book is already in cart!",
            });
        }

        // Add book to cart
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json({ message: "Book added to Cart!" });
    } catch (error) {
        console.error("Add to cart error:", error);
        return res.status(500).json({ message: "An error occurred!" });
    }
});

// Remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(bookid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Remove book from cart
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.json({
            status: "Success",
            message: "Book removed from Cart",
        });
    } catch (error) {
        console.error("Remove from cart error:", error);
        return res.status(500).json({ message: "An error occurred!" });
    }
});

// Get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const userData = await User.findById(id).populate("cart"); // Populate cart with Book details
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cart = userData.cart.slice().reverse(); // Reverse a copy of the array
        return res.json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        console.error("Get user cart error:", error);
        return res.status(500).json({ message: "An error occurred!" });
    }
});

module.exports = router;
