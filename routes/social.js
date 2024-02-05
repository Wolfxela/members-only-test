const express = require("express")
const router = express.Router()
const userController = require("../controllers/user_controller")
const postController = require("../controllers/post_controller")

router.get("/user/secret/:id",userController.user_membership_enter_get)
router.post("/user/secret/:id",userController.user_membership_enter_post)
router.get("/",userController.index) //post list here
router.get("/user/create",userController.user_create_get)
router.post("/user/create",userController.user_create_post)
router.get("/user/:id/delete",userController.user_delete_get)
router.post("/user/:id/delete",userController.user_delete_post)
router.get("/user/:id/update",userController.user_update_get)
router.post("/user/:id/update",userController.user_update_post)
router.get("/user/:id",userController.user_details)

router.get("/post/create",postController.post_create_get)
router.post("/post/create",postController.post_create_post)
router.get("/post/:id/update",postController.post_update_get)
router.post("/post/:id/update",postController.post_update_post)
router.get("/post/:id/delete",postController.post_delete_get)
router.post("/post/:id/delete",postController.post_delete_post)
// router.get("/post/:id",postController.post_details)

module.exports = router