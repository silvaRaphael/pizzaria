export const ClearDatabaseTests = async (
  prisma: any,
  idsToDelete: string[],
) => {
  try {
    if (process.env.NODE_ENV !== 'test') return;

    await prisma.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });
  } catch (error: any) {
    throw new Error('Erro ao limpar testes do banco de dados');
  }
};
