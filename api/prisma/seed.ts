import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
// Init Prisma client
const prisma = new PrismaClient();

async function main() {
  const password = await hash('password#1', await genSalt(10));
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      email: 'admin@gmail.com',
    },
    create: {
      username: 'admin',
      email: 'admin@gmail.com',
      password,
      name: 'Administrator',
    },
  });

  _.times(10, async (i) => {
    await prisma.customer.upsert({
      where: { id: i },
      update: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
      },
      create: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
      }
    });
  });

  _.times(3, async (i) => {
    await prisma.mailProvider.upsert({
      where: { id: i },
      update: {
        name: faker.company.name(),
        port: faker.datatype.number(1000),
        host: faker.internet.ipv4(),
        username: faker.internet.email(),
        password: faker.random.alphaNumeric(8),
        secure: true,
        searchIndex: i
      },
      create: {
        name: faker.company.name(),
        port: faker.datatype.number(1000),
        host: faker.internet.ipv4(),
        username: faker.internet.email(),
        password: faker.random.alphaNumeric(8),
        secure: true,
        searchIndex: i
      }
    });
  });

  console.log(admin);
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client at the end
    await prisma.$disconnect();
  });
