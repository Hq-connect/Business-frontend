import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
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