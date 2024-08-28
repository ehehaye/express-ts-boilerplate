import * as path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: ['.env.local', '.env', `.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`],
});

process.env.UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
