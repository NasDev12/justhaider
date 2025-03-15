import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Server {
  id: string;
  name: string;
  ip: string;
  port: number;
  version: string;
  description: string;
  banner_url: string;
  website_url: string;
  discord_url: string;
  status: boolean;
  players_online: number;
  max_players: number;
  uptime_percentage: number;
  votes_count: number;
}

interface ServerContextType {
  servers: Server[];
  loading: boolean;
  error: string | null;
  refreshServers: () => Promise<void>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServers = async () => {
    try {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .order('votes_count', { ascending: false });

      if (error) throw error;
      setServers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshServers = async () => {
    setLoading(true);
    await fetchServers();
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <ServerContext.Provider value={{ servers, loading, error, refreshServers }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};