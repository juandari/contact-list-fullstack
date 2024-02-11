import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllContacts } from "prisma/contact";

export const loader = async () => {
  const contacts = await getAllContacts();
  return {
    contacts,
  };
};

export default function ContactList() {
  const { contacts } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Contacts Lists</h1>
      <Link to="/contacts/new">
        <button>Create Contact</button>
      </Link>

      {contacts.map((contact) => {
        return (
          <Link to={`/contacts/${contact.id}`} key={contact.id}>
            <h2>
              {contact.firstName} {contact.lastName}
            </h2>
          </Link>
        );
      })}
      <Outlet />
    </div>
  );
}
