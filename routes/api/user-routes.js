const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router
	.route("/:id")
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById);

module.exports = router;
