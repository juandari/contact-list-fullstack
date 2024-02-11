import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteContact, getContactById } from "prisma/contact";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contactId = Number(params.contactId);
  const contact = await getContactById(contactId);
  return {
    contact,
  };
};

export default function ContactDetail() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Contacts Details</h1>

      <div>
        <h2>
          {contact?.firstName} {contact?.lastName}
        </h2>
        <p>{contact?.email}</p>
        <p>{contact?.phone}</p>
      </div>

      <Link to={`/contacts/edit/${contact?.id}`}>
        <button>Edit</button>
      </Link>

      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}

export const action = async ({ params }: ActionFunctionArgs) => {
  await deleteContact(Number(params.contactId));
  return redirect("/contacts");
};
