const router = require("express").Router();
const User = require("../models/user");
const jwt  = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");
const mongoose = require("mongoose");

// add book -- admins
router.post("/add-book",authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(!user || user.role !=="admin"){
            return res.status(400).json("Access Can Not be Granted to You!");
        }
        const newBook = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price:req.body.price,
            description: req.body.description,
            language: req.body.language,

        });
        await newBook.save();
        return res.status(200).json({message:"Book Added Successfully!"});   
        }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
});
// Update route - Fixed to match frontend expectations
router.put("/update-book/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers; // User ID for authentication
        const user = await User.findById(id);
        if(!user || user.role !=="admin"){
            return res.status(400).json({message: "Access Can Not be Granted to You!"});
        }

        const { bookid } = req.headers; // Extract bookId from headers
        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required in headers!" });
        }

        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            return res.status(400).json({ message: "Invalid Book ID format!" });
        }

        const existingBook = await Book.findById(bookid);
        if (!existingBook) {
            return res.status(404).json({ message: "Book not found!" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookid,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description,
                language: req.body.language,
            },
            { new: true, runValidators: true } // Returns updated document
        );

        if (!updatedBook) {
            return res.status(500).json({ message: "Update failed!" });
        }

        return res.status(200).json({ message: "Book updated successfully!", data: updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "An error occurred!", error: error.message });
    }
});

// Delete route
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers; // Use consistent naming and lowercase

        console.log('Attempting to delete book with ID:', bookid);

        // Validate that bookid exists
        if (!bookid) {
            console.log('Book ID not provided');
            return res.status(400).json({ message: "Book ID is required in headers!" });
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            console.log('Invalid bookId format');
            return res.status(400).json({ message: "Invalid Book ID format" });
        }

        // Perform delete operation
        const deletedBook = await Book.findByIdAndDelete(bookid);

        if (!deletedBook) {
            console.log('Book not found in database');
            return res.status(404).json({ message: "Book not found!" });
        }

        console.log('Book deleted successfully:', deletedBook);
        return res.status(200).json({ message: "Book deleted successfully!" });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ 
            message: "An error occurred!", 
            error: error.message 
        });
    }
});

/*  public api */

//get all books
router.get("/get-all-books",async (req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status: "Success",
            data: books,
        });
    }
    catch(error){
        res.status(500).json({message:"An error occured!"});
    }

});
//get-recent-books
router.get("/get-recent-books", async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status:"Success",
            data: books,
        });
    }
    catch(error){
        res.status(500).json({message: "An error occured!"});
    }
});
//get book-by-id
router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status:"Success",
            data: book,
        });
    }
    catch(error){
        res.json(500).json({message:"An error occurred!"});
    }
});
module.exports = router;