import { createContext, useContext, useReducer } from "react";
import { IUser } from "../types";

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

type Action = { type: "login"; payload: IUser } | { type: "logout" };

function reducer(state: IAuthState, action: Action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, isAuthenticated: false };
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext was used outside of the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
