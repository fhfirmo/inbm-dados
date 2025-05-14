"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ListClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement actual search logic here
  };

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('Client')
        .select('*');

      if (error) {
        setError(error);
      } else {
        setClients(data);
      }
      setLoading(false);
    }

    fetchClients();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button onClick={handleSearch} style={{ padding: '8px 15px' }}>Buscar</button>
      </div>

      {loading && <p>Loading clients...</p>}
      {error && <p>Error loading clients: {error.message}</p>}

      {!loading && !error && (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Código</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nome da Entidade</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>CNPJ</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id_cliente}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.codigo_cliente}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.nome}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.cnpj}</td> {/* Assuming CNPJ is directly in Client table */}
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ marginRight: '5px' }}>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      <div style={{ marginTop: '20px' }}>
        <button>Cadastrar Novo Cliente</button>
      </div>
    </div>
  );
}