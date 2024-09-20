// io.js
import fs from 'fs/promises';

export async function loadCats() {
    try {
        const data = await fs.readFile('data/cats.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading cats:', error);
        return [];
    }
}

export async function saveCats(cats) {
    try {
        const jsonData = JSON.stringify(cats, null, 2);
        await fs.writeFile('data/cats.json', jsonData, 'utf8');
    } catch (error) {
        console.error('Error saving cats:', error);
        throw error; // Propagate the error
    }
}

