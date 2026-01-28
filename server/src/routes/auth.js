const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Register/Login Student
router.post('/login', async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        return res.status(400).json({ error: 'Email and Name are required' });
    }

    try {
        // Check if student exists
        let student = await prisma.student.findUnique({
            where: { email },
        });

        if (!student) {
            // Assign group randomly or round-robin in production
            // For this prototype, we alternate based on count or random
            const group = Math.random() > 0.5 ? 'EXPERIMENTAL' : 'CONTROL';
            student = await prisma.student.create({
                data: { name, email, group },
            });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        // Fallback if DB connects fail (Mock Mode)
        // res.json({ id: 'mock-id', name, email, group: 'EXPERIMENTAL' });
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
