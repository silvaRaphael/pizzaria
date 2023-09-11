type PizzaSizes = {
  id: number;
  size: string;
  price: number;
  priceLabel: string;
};

export const pizzaSizes: PizzaSizes[] = [
  { id: 0, size: 'Pequena', price: 50.0, priceLabel: '50,00' },
  { id: 1, size: 'Média', price: 75.0, priceLabel: '75,00' },
  { id: 2, size: 'Grande', price: 100.0, priceLabel: '100,00' },
];
