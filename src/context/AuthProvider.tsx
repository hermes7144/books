import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
      navigate('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout, setUser }}>{children}</AuthContext.Provider>;
}
