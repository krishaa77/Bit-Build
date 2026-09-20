-- EcoRoute AI - Supabase / PostgreSQL Schema
-- Run this in Supabase SQL Editor

-- Bins table
CREATE TABLE IF NOT EXISTS bins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bin_id VARCHAR(20) UNIQUE NOT NULL,
    location_name VARCHAR(200) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity_kg DOUBLE PRECISION NOT NULL,
    fill_percentage DOUBLE PRECISION NOT NULL DEFAULT 0,
    waste_type VARCHAR(50) NOT NULL,
    last_collection TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id VARCHAR(20) UNIQUE NOT NULL,
    capacity_kg DOUBLE PRECISION NOT NULL,
    current_load_kg DOUBLE PRECISION NOT NULL DEFAULT 0,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waste records (for analytics)
CREATE TABLE IF NOT EXISTS waste_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bin_id VARCHAR(20) NOT NULL REFERENCES bins(bin_id),
    waste_type VARCHAR(50) NOT NULL,
    quantity_kg DOUBLE PRECISION NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bin_id VARCHAR(20) NOT NULL REFERENCES bins(bin_id),
    vehicle_id VARCHAR(20) NOT NULL REFERENCES vehicles(vehicle_id),
    collected_quantity_kg DOUBLE PRECISION NOT NULL,
    collection_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bins_bin_id ON bins(bin_id);
CREATE INDEX IF NOT EXISTS idx_bins_waste_type ON bins(waste_type);
CREATE INDEX IF NOT EXISTS idx_waste_records_recorded_at ON waste_records(recorded_at);
CREATE INDEX IF NOT EXISTS idx_collections_collection_time ON collections(collection_time);

-- RLS (enable if using Supabase auth later)
-- ALTER TABLE bins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE waste_records ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE collections ENABLE ROW LEVEL SECURITY;