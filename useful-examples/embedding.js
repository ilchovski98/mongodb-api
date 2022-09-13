const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

mongoose.connect(process.env.DATABASE_URI_EMBEDDING)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId}, {
    $set: {
      'author.name': 'Jhon Smith'
    }
  });
}

// If we had authors: Array
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

// If we had authors: Array
async function removeAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  const author = course.author.id(author);
  author.remove();
  course.save();
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

createCourse('Node Course', new Author({ name: 'Mosh' }));
