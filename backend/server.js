import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bidsFilePath = path.join(__dirname, 'data', 'bids.json');

// Read bids from JSON file helper
const getBidsData = () => {
  try {
    const data = fs.readFileSync(bidsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bids file:', error);
    return [];
  }
};

// GET /api/bids endpoint matching Vercel mock API structure
app.get('/api/bids', (req, res) => {
  const { id, createdBy, sortBy } = req.query;
  let bids = getBidsData();

  // 1. If ID is provided, return single bid details
  if (id) {
    const bidId = parseInt(id, 10);
    const bid = bids.find(b => b.id === bidId);
    if (!bid) {
      return res.status(404).json({
        success: false,
        message: `Bid with ID ${id} not found`
      });
    }
    return res.json({
      success: true,
      data: bid
    });
  }

  // 2. Filter by createdBy (case-insensitive partial match)
  if (createdBy) {
    const searchTerm = createdBy.toLowerCase();
    bids = bids.filter(bid => 
      bid.createdBy && bid.createdBy.toLowerCase().includes(searchTerm)
    );
  }

  // 3. Sort by Date
  if (sortBy === 'asc') {
    // Oldest First
    bids.sort((a, b) => {
      const dateTimeA = new Date(`${a.startDate}T${a.startTime}`);
      const dateTimeB = new Date(`${b.startDate}T${b.startTime}`);
      return dateTimeA - dateTimeB;
    });
  } else if (sortBy === 'desc') {
    // Newest First
    bids.sort((a, b) => {
      const dateTimeA = new Date(`${a.startDate}T${a.startTime}`);
      const dateTimeB = new Date(`${b.startDate}T${b.startTime}`);
      return dateTimeB - dateTimeA;
    });
  }

  // Return standard count and list format
  res.json({
    success: true,
    count: bids.length,
    data: bids
  });
});

app.listen(PORT, () => {
  console.log(`Backend mock server running on http://localhost:${PORT}`);
});
