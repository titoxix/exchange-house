"use client";

import { useFormState } from "react-dom";
import { signup } from "@/actions/auth";
import { auth } from "../../../auth";

export default function SignupForm() {
  //const { pending, data, action } = useFormStatus();
  const [state, action, pending] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <div>
        <label htmlFor="rol">Rol</label>
        <select id="rol" name="rol">
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button aria-disabled={pending} type="submit">
        {pending ? "Submitting..." : "Sign up"}
      </button>
    </form>
  );
}
