const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const mongoose = require("mongoose");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Using "id" for user ID and "bookid" for book ID

        // Validate headers
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required in headers!" });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(bookid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Book ID or User ID format!" });
        }

        // Check if user exists
        const user = await User.findById(id).select("favourites");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Check if book exists
        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: "Book not found!" });
        }

        // Check if book is already in favourites
        const isBookFavourite = user.favourites.some(fav => fav.toString() === bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites!" });
        }

        // Add book to favourites
        user.favourites.push(bookid);
        await user.save(); // Save changes to the database

        return res.status(200).json({ message: "Book added to favourites!" });
    } catch (error) {
        console.error("Error adding book to favourites:", error);
        return res.status(500).json({ message: "An error occurred!", error: error.message });
    }
});

// Remove book from favourites
router.put("/remove-book-from-favourites", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Using "id" for user ID and "bookid" for book ID

        // Validate headers
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required in headers!" });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(bookid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Book ID or User ID format!" });
        }

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Check if book is in favourites
        const isBookFavourite = user.favourites.some(fav => fav.toString() === bookid);
        if (!isBookFavourite) {
            return res.status(404).json({ message: "Book is not in favourites!" });
        }

        // Remove book from favourites
        user.favourites = user.favourites.filter(fav => fav.toString() !== bookid);
        await user.save(); // Save changes to the database

        return res.status(200).json({ message: "Book removed from favourites!" });
    } catch (error) {
        console.error("Error removing book from favourites:", error);
        return res.status(500).json({ message: "An error occurred!", error: error.message });
    }
});

// Get favourite books of a user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Using "id" for user ID

        // Validate header
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers!" });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID format!" });
        }

        // Check if user exists and populate favourite books
        const user = await User.findById(id).populate("favourites", "-__v"); // Exclude unwanted fields
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const favouriteBooks = user.favourites;
        return res.status(200).json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.error("Error fetching favourite books:", error);
        return res.status(500).json({ message: "An error occurred!", error: error.message });
    }
});

module.exports = router;
