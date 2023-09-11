import { prisma } from '../database/prisma';

export const populateStateTable = async () => {
  try {
    const stateCount = await prisma.state.count();

    if (stateCount) return;

    await prisma.state.createMany({
      data: [
        { id: '12', state: 'Acre', abbr: 'AC' },
        { id: '27', state: 'Alagoas', abbr: 'AL' },
        { id: '16', state: 'Amapá', abbr: 'AP' },
        { id: '13', state: 'Amazonas', abbr: 'AM' },
        { id: '29', state: 'Bahia', abbr: 'BA' },
        { id: '23', state: 'Ceará', abbr: 'CE' },
        { id: '53', state: 'Distrito Federal', abbr: 'DF' },
        { id: '32', state: 'Espírito Santo', abbr: 'ES' },
        { id: '52', state: 'Goiás', abbr: 'GO' },
        { id: '21', state: 'Maranhão', abbr: 'MA' },
        { id: '51', state: 'Mato Grosso', abbr: 'MT' },
        { id: '50', state: 'Mato Grosso do Sul', abbr: 'MS' },
        { id: '31', state: 'Minas Gerais', abbr: 'MG' },
        { id: '15', state: 'Pará', abbr: 'PA' },
        { id: '25', state: 'Paraíba', abbr: 'PB' },
        { id: '41', state: 'Paraná', abbr: 'PR' },
        { id: '26', state: 'Pernambuco', abbr: 'PE' },
        { id: '22', state: 'Piauí', abbr: 'PI' },
        { id: '33', state: 'Rio de Janeiro', abbr: 'RJ' },
        { id: '24', state: 'Rio Grande do Norte', abbr: 'RN' },
        { id: '43', state: 'Rio Grande do Sul', abbr: 'RS' },
        { id: '11', state: 'Rondônia', abbr: 'RO' },
        { id: '14', state: 'Roraima', abbr: 'RR' },
        { id: '42', state: 'Santa Catarina', abbr: 'SC' },
        { id: '35', state: 'São Paulo', abbr: 'SP' },
        { id: '28', state: 'Sergipe', abbr: 'SE' },
        { id: '17', state: 'Tocantins', abbr: 'TO' },
      ],
    });

    console.log('State populated!');
  } catch (error: any) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
};
