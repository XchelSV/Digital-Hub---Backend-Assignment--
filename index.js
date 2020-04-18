const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({extended: true}));

app.use('/api/transactions', require('./routes/transactions'));

app.listen(PORT, () => {
    console.log(`Server Running on Port number ${PORT}`);
})