# Social Network API

## Description

The Social Network API is designed for a social media startup, allowing users to share their thoughts, react to friends' thoughts, and create a friend list. This API uses Express.js for routing, a MongoDB database, and the Mongoose ODM. It is capable of handling large amounts of unstructured data, typical of social network platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [License](#license)
- [Author](#author)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-network-api.git
   ```
2. Navigate to the project directory: cd social-network-api
    
3. Install dependencies: npm install
   
4. Ensure MongoDB is installed and running on your local machine. [Steps to install MongoDB](https://www.mongodb.com/docs/manual/installation/)

5. Start the server: node server.js

## Usage

1. USe postman or Insomnia to test the API end points.

2. MongoDB Compass can be used to view and manage the data.


## API Endpoints

### Recording
[Recording of API Endpoint testing](APItesting.webm)

### Users

* GET /api/users - Get all users
* GET /api/users/:userId - Get a single user by ID
* POST /api/users - Create a new user
    ```json
    {
    "username": "newUser",
    "email": "newUser@example.com"
    }
    ```
* PUT /api/users/:userId - Update a user by ID
    ```json
    {
    "username": "updatedUser",
    "email": "updatedUser@example.com"
    }

    ```
* DELETE /api/users/:userId - Delete a user by ID

### Friends

* POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list
* DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list

### Thoughts

* GET /api/thoughts - Get all thoughts
* GET /api/thoughts/:thoughtId - Get a single thought by ID
* POST /api/thoughts - Create a new thought
    ```json
    {
  "thoughtText": "Here’s a cool thought...",
  "username": "user123",
  "userId": "replace_with_user_id"
    }

    ```
* PUT /api/thoughts/:thoughtId - Update a thought by ID
    ```json
    {
  "thoughtText": "Updated thought text"
    }

    ```
*  DELETE /api/thoughts/:thoughtId - Delete a thought by ID

### Reactions

* POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought 
    ```json
    {
  "reactionBody": "Great thought!",
  "username": "user123"
    }
    ```
* DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought

## Models

### User

```javascript
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
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
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

```

### Thought

```javascript
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

```

## License

This project is licensed under the MIT License.

## Author

Developed by [Ralph Molu](www.linkedin.com/in/ralph-molu)