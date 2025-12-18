require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const User = require('./models/User');
const Person = require('./models/Person');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/register', async (req, res) => {
  try { await new User(req.body).save(); res.json("Success"); } 
  catch (err) { res.status(400).send(err); }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  user ? res.json({ id: user._id, role: user.role, email: user.email }) : res.status(401).send("Invalid");
});

app.get('/api/people', async (req, res) => {
  const data = await Person.find().sort({ dateReported: -1 });
  res.json(data);
});

app.post('/api/people', upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body, photo: req.file ? req.file.filename : '', dateReported: new Date() };
    await new Person(data).save();
    res.json("Reported");
  } catch (err) { res.status(500).send(err); }
});

app.put('/api/people/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json("Updated");
});

app.delete('/api/people/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

app.listen(5000, () => console.log(" Server on 5000"));