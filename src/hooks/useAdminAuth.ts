import { useState, useEffect } from 'react';
import { config } from '../lib/config';

export function useAdminAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      
      setIsAuthorized(token === config.admin.token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthorized, isLoading };
}