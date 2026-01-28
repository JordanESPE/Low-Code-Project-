const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get Tasks (filtered by type if needed, or all)
router.get('/', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        // If no tasks, seed some dummy ones?
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Start Attempt
router.post('/attempt/start', async (req, res) => {
    const { studentId, taskId } = req.body;
    try {
        const attempt = await prisma.attempt.create({
            data: {
                studentId,
                taskId,
                startTime: new Date(),
            }
        });
        res.json(attempt);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start attempt' });
    }
});

// Finish Attempt
router.post('/attempt/finish', async (req, res) => {
    const { attemptId, codeSubmission } = req.body;
    try {
        const attempt = await prisma.attempt.update({
            where: { id: attemptId },
            data: {
                endTime: new Date(),
                codeSubmission,
                // Calculate quality score logic here or later
                qualityScore: Math.floor(Math.random() * 100), // Placeholder
            }
        });
        res.json(attempt);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit attempt' });
    }
});

module.exports = router;
