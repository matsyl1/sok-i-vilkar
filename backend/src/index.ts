import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// serve statisk fil fra front
app.use(express.static(path.join(__dirname, '../public')));

// spa fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

// app.get('/', (req, res) => {
//     res.send('hi from back')
// });

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}')
});