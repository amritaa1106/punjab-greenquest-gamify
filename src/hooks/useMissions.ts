import { useState, useEffect } from 'react';
import { useAuth, supabase } from '@/contexts/AuthContext';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  difficulty: number;
  duration_days: number;
  status: 'active' | 'completed' | 'expired';
  requirements: Record<string, any>;
  created_at: string;
  expires_at?: string;
}

export interface UserMission {
  id: string;
  user_id: string;
  mission_id: string;
  status: 'active' | 'completed' | 'expired';
  progress: number;
  points_earned: number;
  started_at: string;
  completed_at?: string;
  mission: Mission;
}

export const useMissions = () => {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [userMissions, setUserMissions] = useState<UserMission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMissions();
    if (user) {
      fetchUserMissions();
    }
  }, [user]);

  const fetchMissions = async () => {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMissions(data || []);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };

  const fetchUserMissions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_missions')
        .select(`
          *,
          mission:missions(*)
        `)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false });

      if (error) throw error;
      setUserMissions(data || []);
    } catch (error) {
      console.error('Error fetching user missions:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinMission = async (missionId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('user_missions')
        .insert([
          {
            user_id: user.id,
            mission_id: missionId,
            status: 'active',
            progress: 0,
          },
        ])
        .select('*')
        .single();

      if (error) throw error;
      
      // Refresh user missions
      fetchUserMissions();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const submitEvidence = async (userMissionId: string, fileUrl: string, description: string, fileType: string) => {
    try {
      const { data, error } = await supabase
        .from('evidence')
        .insert([
          {
            user_mission_id: userMissionId,
            file_url: fileUrl,
            file_type: fileType,
            description,
            status: 'pending',
          },
        ])
        .select('*')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  return {
    missions,
    userMissions,
    loading,
    joinMission,
    submitEvidence,
    refreshMissions: fetchMissions,
    refreshUserMissions: fetchUserMissions,
  };
};