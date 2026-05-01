import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Task from "./models/Task.js";

dotenv.config();

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log("✓ Cleared existing data");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin"
    });
    console.log("✓ Admin user created:", admin.email);

    // Create test users
    const user1Password = await bcrypt.hash("user123", 10);
    const user1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: user1Password,
      role: "user"
    });
    console.log("✓ User 1 created:", user1.email);

    const user2Password = await bcrypt.hash("user123", 10);
    const user2 = await User.create({
      name: "Jane Smith",
      email: "jane@example.com",
      password: user2Password,
      role: "user"
    });
    console.log("✓ User 2 created:", user2.email);

    const user3Password = await bcrypt.hash("user123", 10);
    const user3 = await User.create({
      name: "Mike Johnson",
      email: "mike@example.com",
      password: user3Password,
      role: "user"
    });
    console.log("✓ User 3 created:", user3.email);

    // Create test tasks
    const tasks = [
      { title: "Complete project report", completed: false, user: user1._id.toString() },
      { title: "Review code changes", completed: true, user: user1._id.toString() },
      { title: "Update documentation", completed: false, user: user1._id.toString() },
      { title: "Fix bug in login form", completed: true, user: user2._id.toString() },
      { title: "Optimize database queries", completed: false, user: user2._id.toString() },
      { title: "Deploy to production", completed: false, user: user3._id.toString() },
      { title: "Setup monitoring alerts", completed: true, user: user3._id.toString() },
      { title: "Write unit tests", completed: false, user: admin._id.toString() }
    ];

    await Task.insertMany(tasks);
    console.log("✓ 8 test tasks created");

    console.log("\n✅ Database seeding completed successfully!\n");
    console.log("Login credentials:");
    console.log("├─ Admin: admin@example.com / admin123");
    console.log("├─ User 1: john@example.com / user123");
    console.log("├─ User 2: jane@example.com / user123");
    console.log("└─ User 3: mike@example.com / user123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
}

seed();
