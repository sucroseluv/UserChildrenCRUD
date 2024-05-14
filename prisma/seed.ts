import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 5;

async function main() {
  const password = await bcrypt.hash('password', roundsOfHashing);

  const user = await prisma.user.upsert({
    where: { login: 'login' },
    update: { password },
    create: {
      login: 'login',
      password,
      firstname: 'Ivan',
      lastname: 'Ivanov',
      middlename: 'Ivanovich',
      birth: new Date(1985, 4, 21),
    },
  });
  let child1, child2;
  if (
    (await prisma.child.findMany({ where: { parentId: user.id } })).length < 5
  ) {
    const ekaterina = {
      firstname: 'Ekaterina',
      lastname: 'Ivanova',
      middlename: 'Ivanovna',
      birth: new Date(2005, 5, 22),
      parentId: user.id,
    };
    if (!(await prisma.child.findFirst({ where: ekaterina }))?.id) {
      child1 = await prisma.child.create({
        data: ekaterina,
      });
    }
    const alexey = {
      firstname: 'Alexey',
      lastname: 'Ivanov',
      middlename: 'Ivanovich',
      birth: new Date(2007, 6, 23),
      parentId: user.id,
    };
    if (!(await prisma.child.findFirst({ where: alexey }))?.id) {
      child2 = await prisma.child.create({
        data: alexey,
      });
    }
  }

  console.log({ user, child1, child2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
