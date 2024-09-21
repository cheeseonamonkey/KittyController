const axios = require('axios');
const baseUrl = 'http://localhost:3000/api';

describe('API endpoints', () => {
    describe('Cats', () => {
        describe('Fetch Operations', () => {
            it('fetches all cats', async () => {
                const { status, data } = await axios.get(`${baseUrl}/cats`);
                expect(status).toBe(200);
                expect(data).toBeInstanceOf(Array);
                expect(data.length).toBeGreaterThan(2);
                expect(data[0]).toMatchObject({ name: expect.any(String), isOutside: expect.any(Boolean) });
            });

            it('fetches a specific cat', async () => {
                const { status, data } = await axios.get(`${baseUrl}/cats/monkey`);
                expect(status).toBe(200);
                expect(data).toHaveProperty('name', 'Monkey');
            });

            it('handles invalid cat names', async () => {
                await expect(axios.get(`${baseUrl}/cats/KittyImposter`)).rejects.toHaveProperty('response.status', 404);
            });

            it('handles unknown parameters gracefully', async () => {
                const { status, data } = await axios.get(`${baseUrl}/cats/monkey?unknownParam=value`);
                expect(status).toBe(200);
                expect(data).toHaveProperty('name', 'Monkey');
                expect(data).toHaveProperty('isOutside', expect.any(Boolean));
            });

            it('is case-insensitive for cat names', async () => {
                const { status, data } = await axios.get(`${baseUrl}/cats/MoNKeY`);
                expect(status).toBe(200);
                expect(data).toHaveProperty('name', 'Monkey');
            });

            it('returns correct headers', async () => {
                const { headers } = await axios.get(`${baseUrl}/cats`);
                expect(headers['content-type']).toMatch(/^application\/json/);

                const { headers: catHeaders } = await axios.get(`${baseUrl}/cats/monkey`);
                expect(catHeaders['content-type']).toMatch(/^application\/json/);
            });
        });

        describe('Update Operations', () => {
            it('updates cat outside status', async () => {
                await axios.get(`${baseUrl}/cats/monkey?isOutside=false`);
                expect((await axios.get(`${baseUrl}/cats/monkey`)).data.isOutside).toBe(false);

                await axios.get(`${baseUrl}/cats/monkey?isOutside=true`);
                expect((await axios.get(`${baseUrl}/cats/monkey`)).data.isOutside).toBe(true);
            });

            it('handles invalid isOutside values', async () => {
                await expect(axios.get(`${baseUrl}/cats/freyja?isOutside=invalid`)).rejects.toHaveProperty('response.status', 422);
                await expect(axios.get(`${baseUrl}/cats/freyja?isOutside=`)).rejects.toHaveProperty('response.status', 422);
            });

            it('handles concurrent updates correctly', async () => {
                await axios.get(`${baseUrl}/cats/monkey?isOutside=false`);

                const update1 = axios.get(`${baseUrl}/cats/monkey?isOutside=true`);
                const update2 = axios.get(`${baseUrl}/cats/monkey?isOutside=false`);

                await Promise.all([update1, update2]);

                const { data } = await axios.get(`${baseUrl}/cats/monkey`);
                expect(data.isOutside).toBe(false);
            });

            it('toggles outside multiple times', async () => {
                const catName = 'elsa';
                const initialStatus = (await axios.get(`${baseUrl}/cats/${catName}`)).data.isOutside;

                for (let i = 0; i < 3; i++) {
                    const newStatus = !initialStatus;
                    await axios.get(`${baseUrl}/cats/${catName}?isOutside=${newStatus}`);
                    const { data } = await axios.get(`${baseUrl}/cats/${catName}`);
                    expect(data.isOutside).toBe(newStatus);

                    await axios.get(`${baseUrl}/cats/${catName}?isOutside=${!newStatus}`);
                    const { data: updatedData } = await axios.get(`${baseUrl}/cats/${catName}`);
                    expect(updatedData.isOutside).toBe(!newStatus);
                }

                const { data: finalData } = await axios.get(`${baseUrl}/cats/${catName}`);
                expect(finalData.isOutside).toBe(initialStatus);
            });

            it('handles idempotent updates', async () => {
                await axios.get(`${baseUrl}/cats/monkey?isOutside=true`);
                await axios.get(`${baseUrl}/cats/monkey?isOutside=true`);
                expect((await axios.get(`${baseUrl}/cats/monkey`)).data.isOutside).toBe(true);
            });


            it('sets all cats to outside', async () => {
                await axios.get(`${baseUrl}/cats/monkey?isOutside=true`);
                await axios.get(`${baseUrl}/cats/elsa?isOutside=true`);
                await axios.get(`${baseUrl}/cats/stormy?isOutside=true`);
                await axios.get(`${baseUrl}/cats/freyja?isOutside=true`);

                const { data: allCatsAfter } = await axios.get(`${baseUrl}/cats`);

                // assert
                expect(allCatsAfter.find(cat => cat.name === 'Monkey').isOutside).toBe(true);
                expect(allCatsAfter.find(cat => cat.name === 'Elsa').isOutside).toBe(true);
                expect(allCatsAfter.find(cat => cat.name === 'Stormy').isOutside).toBe(true);
                expect(allCatsAfter.find(cat => cat.name === 'Freyja').isOutside).toBe(true);
            });

        });
    });
});
