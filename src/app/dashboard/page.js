// src/app/dashboard/page.js
"use client";
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Import the initialized client

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalClients, setTotalClients] = useState(0);
  const [newClients, setNewClients] = useState(0);
  const [motoristsExpiringCNH, setMotoristsExpiringCNH] = useState(0);
  const [vehiclesWithoutCRLV, setVehiclesWithoutCRLV] = useState(0);


  useEffect(() => {
    async function fetchData() {
      // Check authentication state
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Supabase session in dashboard:', session);

      // ... rest of your fetch logic

      // Fetch Total Clients (Placeholder)
      const { count: clientCount, error: clientError } = await supabase
        .from('Client')
        .select('*', { count: 'exact', head: true });
 if (clientError) {
 setError(clientError);
      } else {
 setTotalClients(clientCount);
      }

      // Fetch New Clients (Placeholder - Last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      // Assuming Client table has a creation timestamp like 'data_cadastro'
      const { count: newClientCount, error: newClientError } = await supabase
        .from('Client')
        .select('*', { count: 'exact', head: true })
        .gte('data_cadastro', thirtyDaysAgo);
 if (newClientError) {
 setError(newClientError);
      } else {
 setNewClients(newClientCount);
      }

      // Fetch Motorists with Expiring CNH (Placeholder - next 30 days)
      const nextThirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const { count: motoristsCount, error: motoristsError } = await supabase
        .from('Motorist')
        .select('*', { count: 'exact', head: true })
        .lte('validade_cnh', nextThirtyDays); // Placeholder querygit
 if (motoristsError) {
 setError(motoristsError);
      } else {
 setMotoristsExpiringCNH(motoristsCount);
      }

      // Fetch Vehicles without Valid CRLV (Placeholder)
      // This is a complex query requiring joins, using a placeholder count for now.
      const { count: vehiclesCount, error: vehiclesError } = await supabase
        .from('Vehicle') // This placeholder just counts all vehicles
        .select('*', { count: 'exact', head: true }); // You'll need a more complex query here

 if (vehiclesError) {
 setError(vehiclesError);
      } else {
 setVehiclesWithoutCRLV(vehiclesCount);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      {loading && <p>Loading dashboard data...</p>}
      {error && <p>Error loading dashboard data: {error.message}</p>}

      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-box">
          <h2>Total Clientes</h2>
          <p>{totalClients}</p>
        </div>
        <div className="stat-box">
          <h2>Novos Clientes</h2>
          <p>{newClients}</p>
        </div>
        <div className="stat-box">
          <h2>Motoristas com CNH Vencendo</h2>
          <p>{motoristsExpiringCNH}</p>
        </div>
        <div className="stat-box">
          <h2>Veículos sem CRLV Válido</h2>
          <p>{vehiclesWithoutCRLV}</p>
        </div>
      </div>

      <div className="quick-access">
        <Link href="/clientes/cadastrar" className="quick-access-button">
          Cadastrar Cliente
        </Link>
        <Link href="/clientes/listar" className="quick-access-button">
          Listar Clientes
        </Link>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .stat-box {
          border: 1px solid #ccc;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .quick-access {
          margin-top: 30px;
        }
        .quick-access-button {
          display: inline-block;
          margin: 0 10px;
          padding: 10px 20px;
          background-color: #007bff; /* Example button color */
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .quick-access-button:hover {
          background-color: #0056b3; /* Example hover color */
        }
      `}</style>
    </div>
  );
}