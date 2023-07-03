const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const Attend = require('../models/Attend.js');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');
const Event = require('../models/Event.js');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 100;
const NUM_SEED_EVENTS = 100
const NUM_SEED_ATTENDS = 3000;
const NUM_SEED_COMMENTS = 3000;

// Create users
const users = [];

async function findAllEvents() {
    const allEvents = await Event.find()

    users.push(
        new User ({
          username: 'demo-user',
          email: 'demo@user.com',
          hashedPassword: bcrypt.hashSync('superman', 10)
        })
    )
    
    for (let i = 1; i < NUM_SEED_USERS; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        users.push(
          new User ({
            username: faker.internet.userName({firstName, lastName}),
            email: faker.internet.email({firstName, lastName}),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
          })
        )
      }
      
      const comments = [];
      
      for (let i = 0; i < NUM_SEED_COMMENTS; i++) {
        comments.push(
          new Comment ({
            body: faker.hacker.phrase(),
            userId: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
            eventId: allEvents[Math.floor(Math.random() * NUM_SEED_EVENTS)]._id
          })
        )
      }

      const attends = []

      for (let i = 0; i < NUM_SEED_ATTENDS; i++) {
        attends.push(
            new Attend({
                userId: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
                eventId: allEvents[Math.floor(Math.random() * NUM_SEED_EVENTS)]._id

            })
        )
      }

      console.log("Resetting db and seeding users and comments...");
        User.collection.drop()
        .then(() => Comment.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Comment.insertMany(comments))
        .then(() => Attend.insertMany(attends))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    findAllEvents()

  })
  .then()
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });



// const insertSeeds = () => {
//     console.log("Resetting db and seeding users and comments...");
//         User.insertMany(users)
//         .then(() => Comment.insertMany(comments))
//         .then(() => {
//             console.log("Done!");
//             mongoose.disconnect();
//         })
//         .catch(err => {
//             console.error(err.stack);
//             process.exit(1);
//         });
//   }

// insertSeeds();
