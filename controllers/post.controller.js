import Post from "../models/Post.js";
import User from "../models/User.js";

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["name", "email"],
      },
    });
    if (posts.length === 0) {
      return res.status(404).send("No Posts Found");
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(`error for getAllPosts:`, error);
    res.sendStatus(500);
  }
};

const createPost = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(`error for createPost:`, error);
    res.sendStatus(500);
  }
};

const createPostforUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const post = await user.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(`error for createPostforUser`, error);
    res.sendStatus(500);
  }
};

const getAllPostsForUser = async (req,res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const posts = await user.getPosts();
    res.status(200).json(posts)
  } catch (error) {
    console.log(`error for getAllPostsForUser`, error);
    res.sendStatus(500);
  }
}

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.sendStatus(404);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }

    const newPostData = await post.update(req.body);
    res.status(200).json(newPostData);
  } catch (error) {
    console.log(`error for updatepost:`, error);
    res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.sendStatus(404);
    }

    await post.destroy();
    res.status(204).end();
  } catch (error) {
    console.log("error in deletePost controller", error);
    res.sendStatus(500);
  }
};

export { getAllPost, createPost, updatePost, deletePost, createPostforUser,getAllPostsForUser };
