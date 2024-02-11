import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getContactById, updateContact } from "prisma/contact";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contact = await getContactById(Number(params.contactId));
  return contact;
};

export const action: ActionFunction = async ({ request, params }) => {
  const contactId = Number(params.contactId);
  const formData = await request.formData();
  const updatedContact = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  await updateContact(contactId, updatedContact);

  return redirect("/contacts");
};

export default function Edit() {
  const contact = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Edit Contact</h1>
      <Form method="post">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={contact?.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={contact?.lastName}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={contact?.email}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          defaultValue={contact?.phone || ""}
        />
        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
