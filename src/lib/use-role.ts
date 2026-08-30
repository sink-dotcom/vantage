import { useCallback, useEffect, useState } from "react";

export type Role = "coach" | "coachee";

const KEY = "vantage-role";
const EVENT = "vantage-role-change";

export function getStoredRole(): Role {
  if (typeof window === "undefined") return "coach";
  return window.localStorage.getItem(KEY) === "coachee" ? "coachee" : "coach";
}

export function useRole() {
  const [role, setRoleState] = useState<Role>("coach");

  useEffect(() => {
    setRoleState(getStoredRole());
    const handler = () => setRoleState(getStoredRole());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setRole = useCallback((next: Role) => {
    window.localStorage.setItem(KEY, next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { role, setRole };
}
