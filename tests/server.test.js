import request from 'supertest';
import app from '../server.js'; // Ensure this is your actual Express app

describe('Cat API Tests (without mocks)', () => {
    describe('GET /cats', () => {
        it('should return all cats as JSON', async () => {
            const response = await request(app).get('/cats');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('cats');
            expect(Array.isArray(response.body.cats)).toBe(true);

            response.body.cats.forEach(cat => {
                expect(cat).toHaveProperty('name');
                expect(cat).toHaveProperty('outside');
            });
        });
    });

    describe('GET /cats/:name', () => {
        it('should return a specific cat by name', async () => {
            const response = await request(app).get('/cats/elsa');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('cat');
            expect(response.body.cat).toHaveProperty('name', 'Elsa');
            expect(response.body.cat).toHaveProperty('isOutside');
        });

        it('should return 404 if the cat is not found', async () => {
            const response = await request(app).get('/cats/NonExistentCat');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: 'Cat not found'
            });
        });

        // it('should update the cat status if "outside" query parameter is provided', async () => {
        //     const response = await request(app).get('/cats/Whiskers?outside=false');
        //
        //     expect(response.status).toBe(200);
        //     expect(response.body).toHaveProperty('message', 'Status updated');
        //     expect(response.body.cat).toHaveProperty('name', 'Whiskers');
        //     expect(response.body.cat).toHaveProperty('outside', false);
        // });
        //
        // it('should return 500 if there is an error saving the cat status', async () => {
        //     // For this case, you may need to simulate an error in your real app (e.g., disconnect the database or manipulate the file to fail)
        //     const response = await request(app).get('/cats/Whiskers?outside=false');
        //
        //     // Assuming your app is configured to handle error states properly
        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual({
        //         message: 'Error updating cat status'
        //     });
        // });
    });//
});
