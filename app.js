const express = require('express');
const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
const { rateLimit } =require('express-rate-limit');
const { connectDB } = require('./Database/connectDB');
const globalError = require('./middlewares/errorMiddleware');
const exerciseRoutes = require('./Routes/exerciseRoutes');
const matrielRoutes = require('./Routes/matrielRoutes');
const levelRoutes = require('./Routes/levelRoutes');
const unitRoutes = require('./Routes/unitRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');


const app = express();
// conection data base
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
// limited req 7000 req in 5 minute
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	limit: 7000,
})
app.use(limiter);
app.use(hpp());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// endPionts API
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/matriels', matrielRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/user', userRoutes);


// Global error handling middleware for express
app.use(globalError);


const port =process.env.PORT || 8000;
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); 
});