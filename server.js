import express from 'express';
import { loadCats, saveCats } from './io.js';
import Cat from './models/Cat.js';

const app = express();
const PORT = process.env.PORT || 3000;
let cats = [];

app.use(express.json());

app.get('/api/cats', (req, res) => {
    res.json(cats);
});

app.get('/api/cats/:name', async (req, res) => {
    try {
        const catName = req.params.name.toLowerCase();
        const cat = cats.find(c => c.name.toLowerCase() === catName);

        if (!cat)
            return res.status(404).json('Cat not found');

        const isOutside = req.query.isOutside;

        if (isOutside === undefined || isOutside === null)
            return res.json(cat);

        const isOutsideLower = isOutside.toLowerCase();

        if (isOutsideLower !== 'true' && isOutsideLower !== 'false')
            return res.status(422).json('Invalid isOutside value. Use "true" or "false".');

        const newStatus = isOutsideLower === 'true';
        cat.setOutside(newStatus);
        await saveCats(cats);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json('Internal server error');
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
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
};

initializeServer().catch(error => {
    console.error('Unhandled error during server initialization:', error);
    process.exit(1);
});

export default app;