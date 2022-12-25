"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const post_model_1 = __importDefault(require("../models/post_model"));
const Res_1 = __importDefault(require("../common/Res"));
const Err_1 = __importDefault(require("../common/Err"));
const getAllPostsEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("");
    try {
        const posts = yield post_model_1.default.find();
        return { status: 'OK', data: posts };
    }
    catch (err) {
        return { status: 'FAIL', data: "" };
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts = {};
        if (req.query.sender == null) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.query.sender });
        }
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const posts = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" });
    }
});
const addNewPost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const post = new post_model_1.default({
        message: req.body.message,
        sender: req.body.userId //extract the user id from the auth 
    });
    if (post.message == undefined || post.message == null) {
        post.message = req.body;
        post.sender = req.userId;
        try {
            const newPost = yield post.save();
            console.log("Save Succesful id: " + newPost._id);
            return new Res_1.default(newPost, req.userId, null);
        }
        catch (err) {
            return new Res_1.default(null, req.userId, new Err_1.default(400, err.message));
        }
    }
    try {
        const newPost = yield post.save();
        return new Res_1.default(newPost, req.body.userId, null);
    }
    catch (err) {
        return new Res_1.default(null, req.body.userId, new Err_1.default(400, err.message));
    }
});
const putPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(post);
    }
    catch (err) {
        console.log("fail to update post in db");
        res.status(400).send({ 'error': 'fail adding new post to db' });
    }
});
module.exports = { getAllPosts, addNewPost, getPostById, putPostById, getAllPostsEvent };
//# sourceMappingURL=post.js.map