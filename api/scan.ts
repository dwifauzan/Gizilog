import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { image_data } = req.body ?? {};
  if (!image_data) {
    return res.status(400).json({ error: 'image_data required' });
  }

  const openclawUrl = process.env.OPENCLAW_API_URL;
  const openclawKey = process.env.OPENCLAW_API_KEY;

  if (!openclawUrl) {
    return res.status(500).json({ error: 'OpenClaw API URL not configured' });
  }

  try {
    const ocRes = await fetch(openclawUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(openclawKey && { Authorization: `Bearer ${openclawKey}` }),
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        image_data,
        prompt: 'Analyze this food image. Return JSON with: food_name, calories, protein, fat, carbs, sodium_mg, fiber_g, sugar_g.',
      }),
    });

    if (!ocRes.ok) {
      const errorText = await ocRes.text();
      return res.status(ocRes.status).json({ error: 'OpenClaw API error', details: errorText });
    }

    const result = await ocRes.json();

    const { data: row, error: insertError } = await supabaseAdmin
      .from('scan_history')
      .insert({ user_id: user.id, result, accepted: false })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to persist scan:', insertError);
    }

    return res.status(200).json({
      scan_id: row?.id,
      ...result,
    });
  } catch (err) {
    console.error('Scan API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
