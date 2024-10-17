const Post = require("../models/postModel");

// creer un post

const createPost = async (req, res) => {
  try {
    const post = new Post({
      nomPrenom: req.body.nomPrenom,
      telephone: req.body.telephone,
      table: req.body.table,
      status: req.body.status,
      image: req.file.filename,
    });

    const postData = await post.save();

    res.status(200).send({ success: true, msg: "Invite Data", data: postData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

// afficher tous les posts

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ success: true, msg: "Invite Data", data: posts });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

// supprimer un doPost(

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "Post deleted sucessfully!" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

//   // modifier un poste

const updatePost = async (req, res) => {
  try {
    if (req.file !== undefined) {
      var id = req.body.id;
      var nomPrenom = req.body.nomPrenom;
      var telephone = req.body.telephone;
      var table = req.body.table;
      var status = req.body.status;
      var filename = req.file.filename;

      await Post.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            nomPrenom: nomPrenom,
            telephone: telephone,
            table: table,
            status: status,
            image: filename,
          },
        }
      );
      res.status(200).send({ success: true, msg: "Post Updated sucessfully!" });
    } else {
      var id = req.body.id;
      var nomPrenom = req.body.nomPrenom;
      var telephone = req.body.telephone;
      var table = req.body.table;
      var status = req.body.status;

      await Post.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            nomPrenom: nomPrenom,
            telephone: telephone,
            table: table,
            status: status,
          },
        }
      );
      res.status(200).send({ success: true, msg: "Post Updated sucessfully!" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createPost,

  getPosts,

  deletePost,
  updatePost,
};
