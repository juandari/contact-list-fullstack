import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const getAllContacts = async () => {
  return await db.contactList.findMany();
};

export const getContactById = async (id: number) => {
  return await db.contactList.findUnique({
    where: {
      id,
    },
  });
};

export const createContact = async (contact: Prisma.ContactListCreateInput) => {
  try {
    return await db.contactList.create({
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact", error);
    throw error;
  }
};

export const updateContact = async (
  id: number,
  contact: Prisma.ContactListUpdateInput
) => {
  try {
    return await db.contactList.update({
      where: {
        id,
      },
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact", error);
    throw error;
  }
};

export const deleteContact = async (id: number) => {
  try {
    return await db.contactList.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting contact", error);
    throw error;
  }
};
