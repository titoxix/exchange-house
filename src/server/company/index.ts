import CompanyBD from "@/db/company";

export const getCompanyByIdAuto = async (idAuto: number) => {
  try {
    return await CompanyBD.getCompanyByIdAuto(idAuto);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    return await CompanyBD.getCompanyById(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
