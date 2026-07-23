-- ============================================================
-- Run this ONCE in Supabase → SQL Editor (New query → paste → Run).
-- Adds the "Value" table + new Setting columns and seeds their content.
-- Safe to re-run.
-- ============================================================

-- 1) New Setting columns
ALTER TABLE "Setting"
  ADD COLUMN IF NOT EXISTS "heroBadge" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "mission"   TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "techStack" JSONB NOT NULL DEFAULT '[]';

-- 2) Value table (About-section cards)
CREATE TABLE IF NOT EXISTS "Value" (
  "id"        TEXT NOT NULL,
  "icon"      TEXT NOT NULL,
  "title"     TEXT NOT NULL,
  "body"      TEXT NOT NULL,
  "order"     INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Value" ENABLE ROW LEVEL SECURITY;

-- 3) Fill the new Setting fields
UPDATE "Setting" SET
  "heroBadge" = 'Available for Q3 partnerships · Remote-first',
  "mission"   = 'To help ambitious teams turn bold ideas into products that feel effortless — and stay fast, reliable, and delightful as they grow.',
  "techStack" = '["TypeScript","React","Next.js","Node.js","Go","Python","PostgreSQL","GraphQL","AWS","Kubernetes","Docker","Terraform","React Native","Flutter","Redis","Figma","TensorFlow","Vercel"]'::jsonb
WHERE "id" = 'default';

-- 4) Seed the value cards (only if empty)
INSERT INTO "Value" ("id","icon","title","body","order")
SELECT * FROM (VALUES
  (gen_random_uuid()::text, 'target', 'Outcome-obsessed', 'We measure success by the business results we unlock — not lines of code. Every sprint ties back to a metric that matters.', 0),
  (gen_random_uuid()::text, 'layers', 'Craft at every layer', 'From database schema to pixel spacing, we sweat the details. Quality is a habit we practice on every commit.', 1),
  (gen_random_uuid()::text, 'shield', 'Radically transparent', 'Live boards, weekly demos, and honest timelines. You always know exactly where your product stands.', 2),
  (gen_random_uuid()::text, 'zap', 'Built to scale', 'Architecture decisions made today should still hold at 100× the load. We build for the roadmap, not just the demo.', 3)
) AS v("id","icon","title","body","order")
WHERE NOT EXISTS (SELECT 1 FROM "Value");
