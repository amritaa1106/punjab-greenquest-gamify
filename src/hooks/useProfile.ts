import { useState, useEffect } from 'react';
import { useAuth, supabase } from '@/contexts/AuthContext';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  institution: string;
  class_year?: string;
  points: number;
  level: number;
  streak: number;
  last_activity: string;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, any>;
  points_required: number;
  earned_at?: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserBadges();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBadges = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          earned_at,
          badge:badges(*)
        `)
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      
      const userBadges = data?.map((item: any) => ({
        id: item.badge.id,
        name: item.badge.name,
        description: item.badge.description,
        icon: item.badge.icon,
        criteria: item.badge.criteria,
        points_required: item.badge.points_required,
        earned_at: item.earned_at,
      })) || [];
      
      setBadges(userBadges);
    } catch (error) {
      console.error('Error fetching user badges:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  return {
    profile,
    badges,
    loading,
    updateProfile,
    refreshProfile: fetchProfile,
    refreshBadges: fetchUserBadges,
  };
};