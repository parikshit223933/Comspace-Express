const mongoose = require('mongoose');
const post_schema = new mongoose.Schema(
    {
        content:
        {
            type: String,
            required: true,
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            /* refer to which model? */
            ref: 'User'
        },
        // include the array of all the comment ids in this post schema to load all the comments of a post quickly.
        comments:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment'
                }
            ],
        likes:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Like'
                }
            ]
    },
    {
        timestamps: true
    }
);

const post = mongoose.model('Post', post_schema);
module.exports = post;