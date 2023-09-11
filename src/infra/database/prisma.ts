import { PrismaClient } from '@prisma/client';
import { populateTables } from '../config/populate-tables';

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

const startDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('DB on');
    await prisma.$disconnect();
  } catch (error: any) {
    console.error('DB off:', error);
  }
};

(async () => {
  await startDatabase();
  await populateTables();
})();
