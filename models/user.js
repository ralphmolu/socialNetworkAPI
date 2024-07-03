const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },

    {
        //Schema option indicating that virtuals should be included when data is requested
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property 'friendCount' that retrieved the length of the user's friend array field on query
userSchema
.virtual('friendCount')
//getter method to retrieve the length of the user's friends array field on query
.get(function() {
    return this.friends.length;
});

//initialize the user model using the userSchema
const User = model ('User', userSchema);
