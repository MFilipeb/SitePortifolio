const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db',
    },
  },
});

async function main() {
  const profile = await prisma.profile.findFirst();
  console.log('Original Profile:', JSON.stringify(profile, null, 2));
  const links = await prisma.link.findMany();
  console.log('Original Links:', JSON.stringify(links, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
