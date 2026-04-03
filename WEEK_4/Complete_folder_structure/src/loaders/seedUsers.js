import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRepository from '../repositories/user.repository.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seed() {
  console.log('Connecting to DB:', process.env.DB_URL);

  // Mongoose 7+ no longer needs useNewUrlParser/useUnifiedTopology
  await mongoose.connect(process.env.DB_URL);

  const users = [
    { firstName: 'Ria', lastName: 'Malhotra', email: 'ria@test.com', password: '123456' },
    { firstName: 'John', lastName: 'Doe', email: 'john@test.com', password: '123456' }
  ];

  for (let u of users) {
    await UserRepository.create(u);
  }

  console.log('Users seeded to', process.env.DB_URL);
  await mongoose.disconnect();
}

seed();
