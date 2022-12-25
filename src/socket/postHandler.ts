import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import postController from "../controllers/post";
import Req from '../common/Req';
import Res from '../common/Res';
import Err from '../common/Err';

export = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {

    const getAllPosts = async () => {
        console.log("getAllPosts handler");
        const res = await postController.getAllPostsEvent();
        socket.emit('post:get_all', res);
    }

    const getPostById = (payload) => {
        socket.emit('echo:echo', payload);
    }
    
    const addNewPost = async (payload) => {
        console.log("postAdd with socketId: %s", payload.socketId);
        try {
            const response:Res = await postController.addNewPost(new Req(payload.message, payload.userId));
            socket.emit('post:add.response', response.body);
        } catch (err) {
            socket.emit('post:add.response', { 'status': 'fail' });
        }

    }

    console.log('register echo handlers');
    socket.on("post:get_all", getAllPosts);
    socket.on("post:get_by_id", getPostById);
    socket.on("post:add_new", addNewPost);
}