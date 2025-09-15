import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { user_id, mission_id, points, evidence_approved = false } = await req.json()

    if (!user_id || !mission_id || !points) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Start transaction-like operations
    const { data: userMission, error: userMissionError } = await supabaseClient
      .from('user_missions')
      .select('*')
      .eq('user_id', user_id)
      .eq('mission_id', mission_id)
      .single()

    if (userMissionError) {
      throw new Error('User mission not found')
    }

    // Update user mission with points
    const { error: updateMissionError } = await supabaseClient
      .from('user_missions')
      .update({
        points_earned: points,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', userMission.id)

    if (updateMissionError) {
      throw new Error('Failed to update user mission')
    }

    // Update user profile points and check for level up
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user_id)
      .single()

    if (profileError) {
      throw new Error('User profile not found')
    }

    const newPoints = profile.points + points
    const newLevel = Math.floor(newPoints / 100) + 1 // Level up every 100 points
    const leveledUp = newLevel > profile.level

    // Update user profile
    const { error: updateProfileError } = await supabaseClient
      .from('profiles')
      .update({
        points: newPoints,
        level: newLevel,
        last_activity: new Date().toISOString()
      })
      .eq('id', user_id)

    if (updateProfileError) {
      throw new Error('Failed to update user profile')
    }

    // Check for new badges
    const newBadges = await checkAndAwardBadges(supabaseClient, user_id, newPoints, profile)

    // Refresh leaderboard
    await supabaseClient.rpc('refresh_leaderboard')

    return new Response(
      JSON.stringify({
        success: true,
        points_awarded: points,
        total_points: newPoints,
        level: newLevel,
        leveled_up: leveledUp,
        new_badges: newBadges
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function checkAndAwardBadges(supabaseClient: any, userId: string, totalPoints: number, profile: any) {
  const newBadges = []

  // Get all badges
  const { data: badges } = await supabaseClient
    .from('badges')
    .select('*')

  // Get user's existing badges
  const { data: userBadges } = await supabaseClient
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedBadgeIds = userBadges?.map(ub => ub.badge_id) || []

  for (const badge of badges || []) {
    if (earnedBadgeIds.includes(badge.id)) continue

    let shouldAward = false

    // Check badge criteria
    const criteria = badge.criteria
    
    if (criteria.missions_completed) {
      const { count } = await supabaseClient
        .from('user_missions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'completed')

      if (count >= criteria.missions_completed) {
        shouldAward = true
      }
    }

    if (criteria.points_required && totalPoints >= criteria.points_required) {
      shouldAward = true
    }

    if (criteria.streak_days && profile.streak >= criteria.streak_days) {
      shouldAward = true
    }

    if (shouldAward) {
      await supabaseClient
        .from('user_badges')
        .insert({ user_id: userId, badge_id: badge.id })

      newBadges.push(badge)
    }
  }

  return newBadges
}