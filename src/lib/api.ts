const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// ─── Types ───
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
  };
  errors?: string;
}

export interface ToolsResponse {
  success: boolean;
  count: number;
  data: {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
    gradient: string;
    features: string;
    pricing: string;
    rating: number;
    users: string;
    is_new: boolean;
    is_featured: boolean;
  }[];
}

// ─── API Helper ───
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // Cookies automatically bhejega
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  return res.json() as Promise<T>;
}

// ─── Auth API ───
export async function signUp(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiCall<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signIn(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiCall<AuthResponse>("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signOut(): Promise<AuthResponse> {
  return apiCall<AuthResponse>("/api/auth/signout", {
    method: "POST",
  });
}

export async function getMe(): Promise<AuthResponse> {
  return apiCall<AuthResponse>("/api/auth/me");
}

// ─── OAuth URLs ───
export function getGoogleLoginURL(): string {
  return `${API_URL}/api/auth/google`;
}

export function getGithubLoginURL(): string {
  return `${API_URL}/api/auth/github`;
}

// ─── Tools API ───
export async function getTools(params?: {
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<ToolsResponse> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== "All") {
    query.set("category", params.category);
  }
  if (params?.featured) query.set("featured", "true");
  if (params?.search) query.set("search", params.search);

  const queryString = query.toString();
  const endpoint = queryString
    ? `/api/tools?${queryString}`
    : "/api/tools";

  return apiCall<ToolsResponse>(endpoint);
}