import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
//import { SessionPayload } from '@/app/lib/definitions'

interface SessionPayload {
  userId: string;
  expires: Date;
}

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

/* const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({
    ...payload,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires,
  });
}

export async function updateSession() {
  const session = cookies().get(cookie.name)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + cookie.duration);
  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires,
  });
}

export async function verifySession() {
  const session = cookies().get(cookie.name)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  return { userId: payload.userId };
}

export async function deleteSession() {
  cookies().delete(cookie.name);
} */
