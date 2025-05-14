-- Enable Row Level Security on tables
ALTER TABLE "DbUser" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LinkedEntity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Motorist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vehicle" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CRLV" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RegionState" ENABLE ROW LEVEL SECURITY;

-- Policy for Administrators on all tables: Can do anything
CREATE POLICY "Administrators can manage all data" ON "DbUser"
  FOR SELECT -- Keep only SELECT policy on DbUser for Administrators
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "Client"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "LinkedEntity"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "Motorist"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "Vehicle"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "CRLV"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

CREATE POLICY "Administrators can manage all data" ON "RegionState"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Administrator'));

-- Policy for Supervisors: Can read all data, and manage (insert, update, delete) data related to clients and linked entities.
CREATE POLICY "Supervisors can read all data" ON "DbUser"
 FOR SELECT -- Keep only SELECT policy on DbUser for Supervisors
 TO authenticated
 USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can manage clients and linked entities" ON "Client"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can manage clients and linked entities" ON "LinkedEntity"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can read motorists and vehicles" ON "Motorist"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can read motorists and vehicles" ON "Vehicle"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can read CRLV" ON "CRLV"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));

CREATE POLICY "Supervisors can read RegionState" ON "RegionState"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Supervisor'));


-- Policy for Operators: Can read all data, and manage (insert, update, delete) data related to motorists, vehicles and CRLV.
CREATE POLICY "Operators can read all data" ON "DbUser"
 FOR SELECT -- Keep only SELECT policy on DbUser for Operators
 TO authenticated
 USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can read clients and linked entities" ON "Client"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can read clients and linked entities" ON "LinkedEntity"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can manage motorists, vehicles and CRLV" ON "Motorist"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can manage motorists, vehicles and CRLV" ON "Vehicle"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can manage motorists, vehicles and CRLV" ON "CRLV"
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

CREATE POLICY "Operators can read RegionState" ON "RegionState"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Operator'));

-- Policy for Clients: Can read data related to their linked entities, motorists, vehicles, and CRLV.
-- Assuming a 'client_id' column exists in LinkedEntity, Motorist, Vehicle, and CRLV tables
-- to link them back to the Client table. If not, you would need to add it or adjust the policies.
-- For this example, I will assume a foreign key relationship exists to trace back to the client.

-- Add client_id to relevant tables if not already present for RLS
-- ALTER TABLE "LinkedEntity" ADD COLUMN "id_client" UUID REFERENCES "Client"("id_cliente") ON DELETE CASCADE;
-- ALTER TABLE "Motorist" ADD COLUMN "id_client" UUID REFERENCES "Client"("id_cliente") ON DELETE CASCADE;
-- ALTER TABLE "Vehicle" ADD COLUMN "id_client" UUID REFERENCES "Client"("id_cliente") ON DELETE RESTRICT;
-- ALTER TABLE "CRLV" ADD COLUMN "id_client" UUID REFERENCES "Client"("id_cliente") ON DELETE CASCADE;

-- For the policies below, I will assume the relationship can be traced back to the client.
-- You might need to adjust the 'USING' clauses based on your actual table relationships.

CREATE POLICY "Clients can read their own data in DbUser" ON "DbUser"
 FOR SELECT -- Keep only a basic SELECT policy on DbUser for Clients
 TO authenticated USING (id_usuario = auth.uid());

CREATE POLICY "Clients can read their own client data" ON "Client"
    FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente') AND id_cliente IN (SELECT id_cliente FROM "LinkedEntity" WHERE id_entidade IN (SELECT id_entidade FROM "Motorist" WHERE id_motorista IN (SELECT id_motorista FROM "Vehicle" WHERE id_veiculo IN (SELECT id_veiculo FROM "CRLV" WHERE id_crlv IN (SELECT id_crlv FROM "CRLV" INNER JOIN "Vehicle" ON "CRLV".id_veiculo = "Vehicle".id_veiculo INNER JOIN "Motorist" ON "Vehicle".id_motorista = "Motorist".id_motorista INNER JOIN "LinkedEntity" ON "Motorist".id_entidade = "LinkedEntity".id_entidade INNER JOIN "Client" ON "LinkedEntity".id_cliente = "Client".id_cliente INNER JOIN "DbUser" ON "Client".id_cliente = "DbUser".instituicao WHERE "DbUser".id_usuario = auth.uid()))))));


CREATE POLICY "Clients can read their linked entities" ON "LinkedEntity"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente') AND id_cliente IN (SELECT id_cliente FROM "LinkedEntity" WHERE id_entidade IN (SELECT id_entidade FROM "Motorist" WHERE id_motorista IN (SELECT id_motorista FROM "Vehicle" WHERE id_veiculo IN (SELECT id_veiculo FROM "CRLV" WHERE id_crlv IN (SELECT id_crlv FROM "CRLV" INNER JOIN "Vehicle" ON "CRLV".id_veiculo = "Vehicle".id_veiculo INNER JOIN "Motorist" ON "Vehicle".id_motorista = "Motorist".id_motorista INNER JOIN "LinkedEntity" ON "Motorist".id_entidade = "LinkedEntity".id_entidade INNER JOIN "Client" ON "LinkedEntity".id_cliente = "Client".id_cliente INNER JOIN "DbUser" ON "Client".id_cliente = "DbUser".instituicao WHERE "DbUser".id_usuario = auth.uid()))))));


CREATE POLICY "Clients can read their motorists" ON "Motorist"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente') AND id_entidade IN (SELECT id_entidade FROM "Motorist" WHERE id_motorista IN (SELECT id_motorista FROM "Vehicle" WHERE id_veiculo IN (SELECT id_veiculo FROM "CRLV" WHERE id_crlv IN (SELECT id_crlv FROM "CRLV" INNER JOIN "Vehicle" ON "CRLV".id_veiculo = "Vehicle".id_veiculo INNER JOIN "Motorist" ON "Vehicle".id_motorista = "Motorist".id_motorista INNER JOIN "LinkedEntity" ON "Motorist".id_entidade = "LinkedEntity".id_entidade INNER JOIN "Client" ON "LinkedEntity".id_cliente = "Client".id_cliente INNER JOIN "DbUser" ON "Client".id_cliente = "DbUser".instituicao WHERE "DbUser".id_usuario = auth.uid())))));

CREATE POLICY "Clients can read their vehicles" ON "Vehicle"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente') AND id_veiculo IN (SELECT id_veiculo FROM "CRLV" WHERE id_crlv IN (SELECT id_crlv FROM "CRLV" INNER JOIN "Vehicle" ON "CRLV".id_veiculo = "Vehicle".id_veiculo INNER JOIN "Motorist" ON "Vehicle".id_motorista = "Motorist".id_motorista INNER JOIN "LinkedEntity" ON "Motorist".id_entidade = "LinkedEntity".id_entidade INNER JOIN "Client" ON "LinkedEntity".id_cliente = "Client".id_cliente INNER JOIN "DbUser" ON "Client".id_cliente = "DbUser".instituicao WHERE "DbUser".id_usuario = auth.uid())));


CREATE POLICY "Clients can read their CRLV" ON "CRLV"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente') AND id_crlv IN (SELECT id_crlv FROM "CRLV" INNER JOIN "Vehicle" ON "CRLV".id_veiculo = "Vehicle".id_veiculo INNER JOIN "Motorist" ON "Vehicle".id_motorista = "Motorist".id_motorista INNER JOIN "LinkedEntity" ON "Motorist".id_entidade = "LinkedEntity".id_entidade INNER JOIN "Client" ON "LinkedEntity".id_cliente = "Client".id_cliente INNER JOIN "DbUser" ON "Client".id_cliente = "DbUser".instituicao WHERE "DbUser".id_usuario = auth.uid()));


CREATE POLICY "Clients can read RegionState" ON "RegionState"
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM "DbUser" WHERE id_usuario = auth.uid() AND perfil = 'Cliente'));

-- Policy for authenticated users on DbUser: Can read their own data
CREATE POLICY "Authenticated users can read their own DbUser data" ON "DbUser"
  FOR SELECT
  TO authenticated
  USING (id_usuario = auth.uid());

-- Policy for unauthenticated users: No access to any table data by default.
-- You can add specific policies if you need to allow public read access to certain data.

-- Note: You might need to refine the RLS policies for the 'Cliente' profile
-- based on how a 'Cliente' user is linked to specific data in your tables.
-- The current policies assume a complex join path from DbUser to CRLV, which might
-- not be the most efficient or accurate way to represent the relationship.
-- Consider adding a direct foreign key or a linking table if needed.