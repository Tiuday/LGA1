create extension if not exists "uuid-ossp";

-- Prospects table
create table public.prospects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  prospect_name text not null,
  company text not null,
  offer text not null,
  tone text not null default 'Professional',
  created_at timestamptz default now()
);

-- Outreach sequences table
create table public.outreach_sequences (
  id uuid default uuid_generate_v4() primary key,
  prospect_id uuid references public.prospects(id) on delete cascade,
  asset_type text not null,
  -- 'cold_email' | 'linkedin_dm' | 'follow_up' | 'call_script' | 'breakup_email'
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.prospects enable row level security;
alter table public.outreach_sequences enable row level security;

create policy "Users own their prospects" on public.prospects
  for all using (auth.uid() = user_id);

create policy "Users own their sequences" on public.outreach_sequences
  for all using (
    prospect_id in (select id from public.prospects where user_id = auth.uid())
  );
