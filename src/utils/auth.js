import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = sessionStorage.getItem("jwt");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
