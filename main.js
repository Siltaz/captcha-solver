import 'dotenv/config';
import express from 'express';
import { createWorker } from 'tesseract.js';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

const app = express();
const worker = createWorker();

const env = process.env.NODE_ENV;
const port = process.env.APP_PORT;

app.use(cors());
app.use(hpp());
app.use(helmet());

app.use('/solve_captcha', async (req, res) => {

    try {
        const imageUrl = req.query.uri;
        console.log(`Solving: ${imageUrl}`);

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageUrl);
        const result = eval(text.split("=")[0]);
        // await worker.terminate(); // Causes Issue - need help

        console.log(`Solved: ${result}`);
        res.status(200).json({ result });
    } catch (error) {
        console.log(`Failed: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

app.listen(port, () => {
    console.info(`========== ENV: ${env} ==========`);
    console.info(`🚀 Service listening on the port ${port}`);
    console.info(`=====================================`);
});