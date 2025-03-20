import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  environment: string;
  apiVersion: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
};

export default config; 