-- =============================================================================
-- eSapmada: DMFT Work Monitoring Portal, Ramgarh, Jharkhand
-- PostgreSQL + pgvector Schema for Production RAG Knowledge Base
-- =============================================================================
--
-- INSTRUCTIONS FOR DEPLOYMENT:
-- 1. Install PostgreSQL 15+ and the pgvector extension:
--    - Linux/Ubuntu: sudo apt-get install postgresql-16-pgvector
--    - Docker: docker run -p 5432:5432 -e POSTGRES_PASSWORD=secret pgvector/pgvector:pg16
-- 2. Connect to your database and execute this script:
--    psql -U esapmada_admin -d esapmada_dmft -f schema-pgvector.sql
-- 3. Set POSTGRES_URL in .env.local:
--    POSTGRES_URL="postgresql://esapmada_admin:secret@localhost:5432/esapmada_dmft"
-- =============================================================================

-- Step 1: Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Create the Knowledge Base Chunks table
CREATE TABLE IF NOT EXISTS dmft_knowledge_chunks (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,           -- 'overview', 'lifecycle', 'pendency', 'roles', 'gis', 'reports', 'system'
    stage_number INTEGER NULL,               -- 1 to 10 for lifecycle stages
    source VARCHAR(255) NOT NULL,            -- Official RFP citation (e.g. 'DFMT RFP Section III, Module 1')
    source_hi VARCHAR(255) NOT NULL,
    content_en TEXT NOT NULL,
    content_hi TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    is_implemented BOOLEAN NOT NULL DEFAULT true, -- Distinguishes live eSapmada features from future RFP roadmap
    embedding vector(768),                   -- 768-dimensional vector (Gemini text-embedding-004 standard)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create HNSW (Hierarchical Navigable Small World) index for sub-millisecond cosine vector search
CREATE INDEX IF NOT EXISTS idx_dmft_knowledge_embedding_hnsw 
ON dmft_knowledge_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Step 4: Full-text search GIN index for hybrid lexical + semantic search
CREATE INDEX IF NOT EXISTS idx_dmft_knowledge_fts_en 
ON dmft_knowledge_chunks 
USING gin (to_tsvector('english', title || ' ' || content_en));

-- Step 5: High-speed similarity retrieval function
CREATE OR REPLACE FUNCTION match_dmft_knowledge (
    query_embedding vector(768),
    match_threshold float DEFAULT 0.5,
    match_count int DEFAULT 4
)
RETURNS TABLE (
    id VARCHAR(64),
    title VARCHAR(255),
    title_hi VARCHAR(255),
    category VARCHAR(64),
    stage_number INTEGER,
    source VARCHAR(255),
    source_hi VARCHAR(255),
    content_en TEXT,
    content_hi TEXT,
    is_implemented BOOLEAN,
    similarity float
)
LANGUAGE sql STABLE
AS $$
    SELECT
        id,
        title,
        title_hi,
        category,
        stage_number,
        source,
        source_hi,
        content_en,
        content_hi,
        is_implemented,
        1 - (dmft_knowledge_chunks.embedding <=> query_embedding) AS similarity
    FROM dmft_knowledge_chunks
    WHERE 1 - (dmft_knowledge_chunks.embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
$$;

