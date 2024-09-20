
// server.js
import express from 'express';
import { loadCats, saveCats } from './io.js';
import Cat from './models/Cat.js';

const app = express();
const PORT = process.env.PORT || 3000;

let cats = [];

app.use(express.json());

app.get('/cats', (req, res) => {
    res.json({ cats });
});

app.get('/cats/:name', async (req, res) => {
    const catName = req.params.name;
    const outsideStatus = req.query.outside;

    const cat = cats.find(c => c.name.toLowerCase() === catName.toLowerCase());

    if (cat) {
        if (outsideStatus === undefined) {
            res.json({ cat });
        } else {
            try {
                const newStatus = outsideStatus === 'true';
                cat.setOutside(newStatus);
                await saveCats(cats);
                res.json({ message: 'Status updated', cat });
            } catch (error) {
                console.error('Error updating cat status:', error);
                res.status(500).json({ message: 'Error updating cat status' });
            }
        }
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

const initializeServer = async () => {
    try {
        const loadedCats = await loadCats();
        cats = loadedCats.map(catData => Cat.fromJSON(catData));
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to load cats:', error);
    }
};

initializeServer();

export default app;