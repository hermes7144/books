import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);
  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout, setUser }}>{children}</AuthContext.Provider>;
}
