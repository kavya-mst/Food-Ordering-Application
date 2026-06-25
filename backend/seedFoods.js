require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/food');
const foodSeed = require('./data/foodSeed');

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas for seeding');

    await Food.deleteMany({});
    console.log('Cleared existing food documents');

    const created = await Food.insertMany(foodSeed);
    console.log(`Seeded ${created.length} food documents`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
