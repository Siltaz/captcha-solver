import 'dotenv/config';
import express from 'express';
import { createWorker } from 'tesseract.js';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

const app = express();
const worker = createWorker();

const env = process.env.NODE_ENV;
const port = process.env.APP_PORT;

app.use(morgan('combined', { skip: (_, res) => (res.statusCode < 400) }));
app.use(cors());
app.use(hpp());
app.use(helmet());

app.use('/solve_captcha', async (req, res) => {

    try {
        const imageUrl = req.query.uri;

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageUrl);
        const result = eval(text.split("=")[0]);
        await worker.terminate();

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error })
    }
});

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

app.listen(port, () => {
    console.info(`========== ENV: ${env} ==========`);
    console.info(`🚀 Service listening on the port ${port}`);
    console.info(`=====================================`);
});