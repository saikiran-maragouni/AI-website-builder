-- Migration: Add content_json and template_name columns to generated_sites table
-- This supports the hybrid template approach

-- Add content_json column to store AI-generated JSON content
ALTER TABLE generated_sites 
ADD COLUMN IF NOT EXISTS content_json JSONB;

-- Add template_name column to store which template was used
ALTER TABLE generated_sites 
ADD COLUMN IF NOT EXISTS template_name TEXT;

-- Add comment to explain the columns
COMMENT ON COLUMN generated_sites.content_json IS 'Stores the AI-generated JSON content with meta fields and editable flags for future editing';
COMMENT ON COLUMN generated_sites.template_name IS 'Stores the template name used (restaurant, ecommerce, portfolio, services) for regeneration';

-- Optional: Create index on template_name for faster queries
CREATE INDEX IF NOT EXISTS idx_generated_sites_template_name 
ON generated_sites(template_name);

-- Optional: Create index on content_json for JSONB queries
CREATE INDEX IF NOT EXISTS idx_generated_sites_content_json 
ON generated_sites USING GIN (content_json);
