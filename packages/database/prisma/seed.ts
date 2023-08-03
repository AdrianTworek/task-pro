import { PrismaClient, RoleEnum, User, MemberEnum } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
console.log('seeding database...');

const prisma = new PrismaClient();

const TEST_USER = {
  name: 'Test User',
  email: 'test@user.com',
  role: RoleEnum.USER,
};

const createUsers = async () => {
  const adminPass = await bcrypt.hash('password', 12);

  const passwords = await Promise.all([
    ...Array.from({ length: 10 }).map(async () => {
      return await bcrypt.hash(faker.internet.password(), 12);
    }),
  ]);

  const usersArray: {
    name: string;
    email: string;
    password: string;
    role: keyof typeof RoleEnum;
    image: string;
  }[] = [
    ...passwords.map((password) => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
      role: RoleEnum.USER,
      image: faker.image.avatar(),
    })),

    {
      name: 'admin',
      email: 'admin@admin.com',
      password: adminPass,
      role: RoleEnum.ADMIN,
      image: faker.image.avatar(),
    },
    {
      ...TEST_USER,
      password: adminPass,
      image: faker.image.avatar(),
    },
  ];

  const users = await prisma.user.createMany({
    data: usersArray,
  });

  return users;
};

const createProjects = async (mainUser: User, users: User[]) => {
  const projectsArray = Array.from({ length: 5 }).map((_, idx) => {
    return {
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      createdAt: faker.date.past(),
      members: {
        create: [
          {
            role: MemberEnum.OWNER,
            userId: mainUser.id,
          },
          {
            role: MemberEnum.USER,
            userId: users.at(idx)?.id ?? users[0].id,
          },
        ],
      },
    };
  });

  await Promise.all(
    projectsArray.map(async (project) => {
      await prisma.project.create({
        data: project,
      });
    }),
  );
};

const clearUsers = async () => {
  await prisma.member.deleteMany();

  await prisma.user.deleteMany();
};

const clearProjects = async () => {
  await prisma.project.deleteMany();
};

const main = async () => {
  console.log('clearing database...');
  await clearUsers();
  await clearProjects();
  console.log('database cleared!');
  console.log('creating users...');
  await createUsers();
  const users = await prisma.user.findMany();
  console.log('creating projects...');
  await createProjects(users.find((u) => u.email === TEST_USER.email)!, users);
};

main();
