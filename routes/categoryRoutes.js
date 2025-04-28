const  express = require("express");
const router = express.Router();
const isauth = require("../middleware/authMiddleware");
const {getallCategory, getCategory,createCategory, updateCategory, deleteCategory} = require("../controllers/categorycontroller")



// Get toutes les catégoies 
router.get("/", getallCategory)

// Get une catégoie
router.get("/:id", getCategory)

// create a new category
router.post("/add", isauth, createCategory);

// update une catégoie
router.put("/:id", isauth, updateCategory);

// delete une catégoie
router.delete("/:id", isauth, deleteCategory); 

module.exports = router;