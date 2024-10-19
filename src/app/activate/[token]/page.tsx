import { UnlockIcon } from "@/components/icons/UnlockIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import { Link, Image, Button } from "@nextui-org/react";
import { getInactiveProfileByToken, activateProfile } from "@/server/profile";
import { updateToken } from "@/server/activeToken";

interface Params {
  token: string;
}

async function activateAccount(params: Params) {
  try {
    const { token } = params;

    if (!token) {
      return {
        activated: false,
      };
    }

    const profile = await getInactiveProfileByToken(token);

    if (!profile) {
      return {
        activated: false,
      };
    }
    // Activate the account
    await activateProfile(profile.idAuto);

    // Update the token
    await updateToken(token);

    return {
      activated: true,
    };
  } catch (error) {
    console.error(error);
    return {
      activated: false,
    };
  }
}

export default async function Activate({ params }: { params: Params }) {
  const { activated } = await activateAccount(params);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="flex items-center mb-6">
          <Image className="w-16 h-16 mr-2" src="/logo.svg" alt="logo" />
          <p className="font-semibold text-2xl text-white">Currency Exchange</p>
        </div>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-900 border-zinc-800">
          <h3 className="text-xl font-bold text-center mt-4">
            Activacion de cuenta
          </h3>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-zinc-800 rounded-full">
              {activated ? (
                <UnlockIcon className="w-10 h-10 text-green-400" />
              ) : (
                <LockIcon className="w-10 h-10 text-red-400" />
              )}
            </div>
            <p className="text-center text-white">
              {activated
                ? "Tu cuenta ha sido activada 🎉"
                : "Error al activar tu cuenta 😢"}
            </p>
            <div className="flex justify-center space-y-4">
              <Link href="/signin">
                <Button>Ir a iniciar sesion</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
