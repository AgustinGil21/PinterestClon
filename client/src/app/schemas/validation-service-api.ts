import { z } from 'zod';

// Esquema para el objeto "hair"
const hairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

// Esquema para el objeto "coordinates"
const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Esquema para el objeto "address"
const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: coordinatesSchema,
  country: z.string(),
});

// Esquema para el objeto "bank"
const bankSchema = z.object({
  cardExpire: z.string(), // Puedes especificar el formato si lo necesitas
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

// Esquema para el objeto "company"
const companySchema = z.object({
  department: z.string(),
  name: z.string(),
  title: z.string(),
  address: addressSchema,
});

// Esquema para el objeto "crypto"
const cryptoSchema = z.object({
  coin: z.string(),
  wallet: z.string(),
  network: z.string(),
});

// Esquema para el objeto principal
export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female', 'other']), // Se puede extender si es necesario
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(), // Puede usarse z.date() si se convierte a Date antes de validar
  image: z.string().optional(), // Si el valor puede ser opcional
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: hairSchema,
  ip: z.string(),
  address: addressSchema,
  macAddress: z.string(),
  university: z.string(),
  bank: bankSchema,
  company: companySchema,
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: cryptoSchema,
  role: z.enum(['admin', 'moderator', 'user']),
});

// Ejemplo de validación
const exampleUser = {
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  maidenName: 'Smith',
  age: 28,
  gender: 'female',
  email: 'emily.johnson@x.dummyjson.com',
  phone: '+81 965-431-3024',
  username: 'emilys',
  password: 'emilyspass',
  birthDate: '1996-5-30',
  image: '...',
  bloodGroup: 'O-',
  height: 193.24,
  weight: 63.16,
  eyeColor: 'Green',
  hair: {
    color: 'Brown',
    type: 'Curly',
  },
  ip: '42.48.100.32',
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    state: 'Mississippi',
    stateCode: 'MS',
    postalCode: '29112',
    coordinates: {
      lat: -77.16213,
      lng: -92.084824,
    },
    country: 'United States',
  },
  macAddress: '47:fa:41:18:ec:eb',
  university: 'University of Wisconsin--Madison',
  bank: {
    cardExpire: '03/26',
    cardNumber: '9289760655481815',
    cardType: 'Elo',
    currency: 'CNY',
    iban: 'YPUXISOBI7TTHPK2BR3HAIXL',
  },
  company: {
    department: 'Engineering',
    name: 'Dooley, Kozey and Cronin',
    title: 'Sales Manager',
    address: {
      address: '263 Tenth Street',
      city: 'San Francisco',
      state: 'Wisconsin',
      stateCode: 'WI',
      postalCode: '37657',
      coordinates: {
        lat: 71.814525,
        lng: -161.150263,
      },
      country: 'United States',
    },
  },
  ein: '977-175',
  ssn: '900-590-289',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
  crypto: {
    coin: 'Bitcoin',
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    network: 'Ethereum (ERC20)',
  },
  role: 'admin',
};
