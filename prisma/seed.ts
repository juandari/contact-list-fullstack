import { PrismaClient } from "@prisma/client";

const seedData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "+123456789",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
    phone: "+987654321",
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const contact of seedData) {
      await prisma.contactList.create({
        data: contact,
      });
    }

    console.log("Seed data created successfully");
  } catch (error) {
    console.error("Error creating seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
