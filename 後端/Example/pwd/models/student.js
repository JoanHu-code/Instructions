const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for a student
const studentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the Student model
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;