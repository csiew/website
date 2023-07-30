CREATE TABLE item (
  id UUID PRIMARY KEY NOT NULL,
  content_type VARCHAR(256) NOT NULL,
  body JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  modified_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);