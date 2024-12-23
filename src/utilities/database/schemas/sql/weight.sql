create table
  public.weight (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    weight character varying null default 'null'::character varying,
    date date null default now(),
    user_id uuid,
    time time without time zone null default (now() at time zone 'utc'::text),
    constraint weight_pkey primary key (id),
  ) tablespace pg_default;