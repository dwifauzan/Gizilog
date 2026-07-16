-- User profile (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  age int,
  gender text check (gender in ('male', 'female')),
  height_cm numeric,
  weight_kg numeric,
  activity_level text,
  daily_calorie_target int,
  created_at timestamptz default now()
);

-- Daily journal entries
create table public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  entry_date date not null,
  meal_type text not null,
  food_name text not null,
  calories numeric not null,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  sodium_mg numeric,
  fiber_g numeric,
  sugar_g numeric,
  threshold_status text,
  created_at timestamptz default now()
);

-- Scan history (raw + accepted)
create table public.scan_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  result jsonb not null,
  accepted boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.journal_entries enable row level security;
alter table public.scan_history enable row level security;

create policy "own profile read" on profiles for select using (auth.uid() = id);
create policy "own profile upsert" on profiles for insert with check (auth.uid() = id);
create policy "own profile update" on profiles for update using (auth.uid() = id);

create policy "own journal all" on journal_entries for all using (auth.uid() = user_id);
create policy "own scans all" on scan_history for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name) values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
