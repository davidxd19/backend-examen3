import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('API Ecommerce funcionando'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
