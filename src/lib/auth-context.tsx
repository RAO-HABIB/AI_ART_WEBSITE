"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  getMe,
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  User,
  AuthResponse,
} from "./api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  signIn: (data: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // App load pe user check karo
  const refreshUser = useCallback(async () => {
    try {
      const response = await getMe();
      if (response.success && response.data) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Check for OAuth redirect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("auth") === "success") {
        refreshUser();
        // Clean URL
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, [refreshUser]);

  const signUp = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiSignUp(data);
    if (response.success && response.data) {
      setUser(response.data.user);
    }
    return response;
  };

  const signIn = async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiSignIn(data);
    if (response.success && response.data) {
      setUser(response.data.user);
    }
    return response;
  };

  const signOut = async () => {
    await apiSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}