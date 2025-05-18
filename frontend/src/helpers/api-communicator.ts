import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/user/login",
    { email, password },
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to Login");
  return res.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/user/signup",
    { name, email, password },
    { withCredentials: true }
  );
  if (res.status !== 201) throw new Error("Unable to Signup");
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/user/logout",
    {},
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to Logout");
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/v1/user/auth-status",
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to Authenticate");
  return res.data;
};



export const sendPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/chats", { prompt },{ withCredentials: true });
    return response.data.response;
  } catch (error: any) {
    console.error("Frontend API error:", error);
    throw new Error(error.response?.data?.error || "Failed to get AI response");
  }
};
