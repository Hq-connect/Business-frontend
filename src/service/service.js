import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const onboardTenant = async (tenantData) => {
  try {
    const response = await api.post("/onboard", tenantData);
    return response.data;
  } catch (error) {
    console.error("Error onboarding tenant:", error);
    throw error;
  }
};