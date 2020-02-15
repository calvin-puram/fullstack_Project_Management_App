const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const Users = require('./model/Users');
const Projects = require('./model/Project');

dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');


const projectData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/projects.json'), 'utf-8')
);

const usersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf-8')
);

connectDB();

const importData = async () => {
  try {
    // await Users.create(usersData);
    await Projects.create(projectData);
    console.log('data imported successfully');
    process.exit();
  } catch (err) {
    console.log('data not imported successfully');
    process.exit();
  }
};

const deleteData = async () => {
  try {
    // await Users.deleteMany();
    await Projects.deleteMany();
    console.log('data deleted successfully');
    process.exit();
  } catch (err) {
    console.log('data not delete successfully');
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
