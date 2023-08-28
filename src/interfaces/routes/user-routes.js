"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var client_1 = require("@prisma/client");
var user_repository_impl_1 = require("../../infrastructure/repositories/user-repository-impl");
var user_controller_1 = require("../controllers/user-controller");
var create_user_use_case_1 = require("../../application/use-cases/user-use-cases/create-user-use-case");
var get_all_users_use_case_1 = require("../../application/use-cases/user-use-cases/get-all-users-use-case");
var get_user_use_case_1 = require("../../application/use-cases/user-use-cases/get-user-use-case");
var router = (0, express_1.Router)();
var prismaClient = new client_1.PrismaClient();
var userRepositoryImpl = new user_repository_impl_1.UserRepositoryImpl(prismaClient);
var userController = new user_controller_1.UserController(new create_user_use_case_1.CreateUserUseCase(userRepositoryImpl), new get_user_use_case_1.GetUserUseCase(userRepositoryImpl), new get_all_users_use_case_1.GetAllUsersUseCase(userRepositoryImpl));
router.post('/users', function (req, res) {
    userController.createTask(req, res);
});
router.get('/user/:userId', function (req, res) {
    userController.getUser(req, res);
});
router.get('/users', function (req, res) {
    userController.getAllUsers(req, res);
});
exports.default = router;
