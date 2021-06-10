const posts = ["This is the post I want", "This is also the post I want"]

(async () => {
    for (let post in posts) {
        await Post.create({ post });
    }

})();

const router = Router();// what does this connect to 

router.get('/', async(req, res) => {
    const posts = await Post.findAll();
    res.render('posts', {posts})
});

const postController = require('../controller')
router.post('/');


module.exports = router;