import mongoose from "mongoose";
import Student from "../src/models/Student";
import Teacher from "../src/models/Teacher";

const MONGODB_URI = "mongodb+srv://vk_db_user:bJDjr4OvWNMXkNkF@vk0.ksj1gsp.mongodb.net/skool";

const studentsData = [
  {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "555-0101",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    parentName: "Robert Johnson",
    parentPhone: "555-0201",
    address: "123 Main St, Springfield",
    dateOfBirth: new Date("2008-05-15"),
    gender: "Male",
  },
  {
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    phone: "555-0102",
    grade: "Grade 8",
    section: "B",
    status: "Pending",
    parentName: "David Miller",
    parentPhone: "555-0202",
    address: "456 Oak Ave, Springfield",
    dateOfBirth: new Date("2010-09-22"),
    gender: "Female",
  },
  {
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "555-0103",
    grade: "Grade 12",
    section: "A",
    status: "Active",
    parentName: "Wei Chen",
    parentPhone: "555-0203",
    address: "789 Pine Ln, Springfield",
    dateOfBirth: new Date("2006-03-03"),
    gender: "Male",
  },
  {
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "555-0104",
    grade: "Grade 9",
    section: "C",
    status: "Inactive",
    parentName: "Lisa Davis",
    parentPhone: "555-0204",
    address: "321 Elm St, Springfield",
    dateOfBirth: new Date("2009-11-11"),
    gender: "Female",
  }
];

const teachersData = [
  {
    name: "Prof. John Smith",
    email: "j.smith@example.com",
    phone: "555-1001",
    subject: "Mathematics",
    qualification: "PhD in Mathematics",
    experience: 12,
    status: "Active",
    salary: 85000,
    gender: "Male",
    address: "101 Faculty Row, Springfield",
    classes: ["Grade 10", "Grade 12"],
  },
  {
    name: "Dr. Amanda Walker",
    email: "a.walker@example.com",
    phone: "555-1002",
    subject: "Physics, Chemistry",
    qualification: "PhD in Physics",
    experience: 8,
    status: "Active",
    salary: 82000,
    gender: "Female",
    address: "202 Science Wing, Springfield",
    classes: ["Grade 11", "Grade 12"],
  },
  {
    name: "Robert Johnson",
    email: "r.johnson@example.com",
    phone: "555-1003",
    subject: "History, Geography",
    qualification: "MA in History",
    experience: 5,
    status: "On Leave",
    salary: 75000,
    gender: "Male",
    address: "303 Liberal Arts Ave, Springfield",
    classes: ["Grade 8", "Grade 9"],
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB -> 'skool' database");

    // Clear existing data
    await Student.deleteMany({});
    console.log("Cleared existing students");
    await Teacher.deleteMany({});
    console.log("Cleared existing teachers");

    // Insert mock data
    await Student.insertMany(studentsData);
    console.log(`Inserted ${studentsData.length} students`);
    
    await Teacher.insertMany(teachersData);
    console.log(`Inserted ${teachersData.length} teachers`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
