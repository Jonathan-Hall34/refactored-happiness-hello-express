import { connectToDB, getDB } from './db/connection.mjs';

await connectToDB();

const db = getDB();

await db.collection('games').deleteMany();

await db.collection('games').insertMany([
  {
    title: "Baldur's Gate 3",
    platform: "PC",
    genre: "RPG",
    status: "Playing",
    rating: 10,
    notes: "Insane amount of depth"
  },
  {
    title: "God of War Ragnarok",
    platform: "PC",
    genre: "Action",
    status: "Backlog",
    rating: null,
    notes: ""
  }
]);

console.log("🌱 Seeded DB!");
process.exit();
