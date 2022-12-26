
import Post from '../models/post_model';
import { Request, Response } from 'express';
import Res from '../common/Res';
import Err from '../common/Err';

const getAllPostsEvent = async () => {
    console.log("")
    try {
        const posts = await Post.find()
        return { status: 'OK', data: posts }
    } catch (err) {
        return { status: 'FAIL', data: "" }
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        let posts = {}
        if (req.query.sender == null) {
            posts = await Post.find()
        } else {
            posts = await Post.find({ 'sender': req.query.sender })
        }
        res.status(200).send(posts)
    } catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" })
    }
}

const getPostById = async (req) => {
    let param = req.params.id;
    if (param == null || undefined){
        param = req.params;
    }
    try {
        const posts = await Post.findById(param);
        return new Res(posts, req.body.userId, null);
    } catch (err) {
        return new Res(new Err(400, err.message), req.body.userId, new Err(400, err.message));
    }
}


const addNewPost = async (req) => {
    console.log(req.body);

    const post = new Post({
        message: req.body.message,
        sender: req.body.userId     //extract the user id from the auth 
    });

    if (post.message == undefined || post.message == null) {
        post.message = req.body;
        post.sender = req.userId;
        try {
            const newPost = await post.save();
            console.log("Save Succesful id: "+ newPost._id);
            return new Res(newPost, req.userId, null);
        } catch (err) {
            return new Res(null, req.userId, new Err(400, err.message));
        }
    }

    try {
        const newPost = await post.save();
        return new Res(newPost, req.body.userId, null);
    } catch (err) {
        return new Res(null, req.body.userId, new Err(400, err.message));
    }

}


const putPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).send(post)
    } catch (err) {
        console.log("fail to update post in db")
        res.status(400).send({ 'error': 'fail adding new post to db' })
    }
}


export = { getAllPosts, addNewPost, getPostById, putPostById, getAllPostsEvent }
