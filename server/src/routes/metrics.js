const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get Experiment Results
router.get('/results', async (req, res) => {
    try {
        const results = await prisma.attempt.findMany({
            include: {
                student: true,
                task: true
            }
        });

        // Aggregation logic could go here
        // e.g. Average time for Low-Code vs High-Code

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

module.exports = router;
