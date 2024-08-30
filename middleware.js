import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', // หรือ '*' สำหรับทุกโดเมน
}));

app.post('/api/login', async (req, res) => {
  // ตัวอย่างการจัดการการล็อกอิน
});

app.listen(3000, () => console.log('Server running on port 3000'));
