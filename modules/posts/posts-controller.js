const PostsModel = require('./models/posts-model');

exports.getPosts = async(req,res,next)=>{
    try {
        console.log(req.body);
    } catch (error) {
        if (error) return next(error);
    }
}