const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.findFirst();
  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: { 
        titleStyle: 'logo',
        avatarUrl: '/perfil_filipe.jpg' 
      }
    });
    console.log('Profile updated: titleStyle=logo, avatarUrl=/perfil_filipe.jpg');
  } else {
    console.log('No profile found.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
