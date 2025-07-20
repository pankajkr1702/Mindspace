import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import blogs from './routes/blogs.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://nandanupadhyay1234:pkPPznLjgogmQZkC@cluster0.5ltnqvy.mongodb.net/mindspace', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api',blogs);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
