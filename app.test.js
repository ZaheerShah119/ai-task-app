const request = require('supertest');
const app = require('./app');

describe('Smart Task Management System API Tests', () => {
    
    // Test 1: Fetch all tasks (Normal Case)
    it('should fetch all tasks successfully', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test 2: Create a task successfully (Normal Case)
    it('should create a new task when data is valid', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Write Lab Assignment Report',
                status: 'pending',
                priority: 'high'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Write Lab Assignment Report');
    });

    // Test 3: Data validation error (Invalid/Edge Case)
    it('should reject task creation if mandatory fields are missing', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Incomplete Data Task'
                // missing status and priority
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Validation Failed');
    });

    // Test 4: Update an existing task (Normal Case)
    it('should update a task details successfully by id', async () => {
        const res = await request(app)
            .put('/api/tasks/1')
            .send({
                status: 'in-progress',
                priority: 'low'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('in-progress');
    });

    // Test 5: Delete a task (Normal Case)
    it('should delete a targeted task successfully by id', async () => {
        const res = await request(app).delete('/api/tasks/2');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Task deleted successfully');
    });
});