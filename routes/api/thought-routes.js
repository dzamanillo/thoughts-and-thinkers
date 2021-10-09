const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	deleteThoughtById,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getThoughtById).delete(deleteThoughtById);

module.exports = router;
