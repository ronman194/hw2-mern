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
const getAllPosts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts = {};
        if (req.query.sender == null) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.query.sender });
        }
        return new Res_1.default(posts, req.body.userId, null);
    }
    catch (err) {
        return new Res_1.default(new Err_1.default(400, err.message), req.body.userId, new Err_1.default(400, err.message));
    }
});
const getPostById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let param = req.params.id;
    if (param == null || undefined) {
        param = req.params;
    }
    try {
        const posts = yield post_model_1.default.findById(param);
        return new Res_1.default(posts, req.body.userId, null);
    }
    catch (err) {
        return new Res_1.default(new Err_1.default(400, err.message), req.body.userId, new Err_1.default(400, err.message));
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
const putPostById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateMessage = req.body.message;
        let postId = req.params.id;
        if (postId == null || postId == undefined) {
            postId = req.params;
        }
        const post = yield post_model_1.default.findByIdAndUpdate(postId, { 'message': updateMessage }, { new: true });
        return new Res_1.default(post, req.body.userId, null);
    }
    catch (err) {
        console.log("fail to update post in db");
        return new Res_1.default(new Err_1.default(400, err.message), req.body.userId, new Err_1.default(400, err.message));
    }
});
module.exports = { getAllPosts, addNewPost, getPostById, putPostById };
//# sourceMappingURL=post.js.map