'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function AddEditClientPage({ isEditing = false, clientData = {} }) {
  const [codigoCliente, setCodigoCliente] = useState(clientData.codigoCliente || '');
  const [nomeEntidade, setNomeEntidade] = useState(clientData.nomeEntidade || '');
  const [cnpj, setCnpj] = useState(clientData.cnpj || '');
  const [endereco, setEndereco] = useState(clientData.endereco || '');
  const [telefone, setTelefone] = useState(clientData.telefone || '');
  const [email, setEmail] = useState(clientData.email || '');
  const [tipoCliente, setTipoCliente] = useState(clientData.tipoCliente || '');

  const handleSave = () => {
    const clientDataToSave = {
      codigo_cliente: codigoCliente,
      nome: nomeEntidade,
      cnpj: cnpj,
      endereco: endereco,
      telefone: telefone,
      email: email,
      tipo_cliente: tipoCliente,
    };

    if (isEditing && clientData.id_cliente) {
      // Update existing client
      updateClient(clientData.id_cliente, clientDataToSave);
    } else {
      // Add new client
      addClient(clientDataToSave);
    }
  };

  const addClient = async (data) => {
    const { error } = await supabase.from('Client').insert([data]);
    if (error) {
      console.error('Error adding client:', error);
    } else {
      console.log('Client added successfully!');
    }
  };

  const updateClient = async (id, data) => {
    const { error } = await supabase.from('Client').update(data).eq('id_cliente', id);
    if (error) {
      console.error('Error updating client:', error);
    } else {
      console.log('Client updated successfully!');
    }
  };

  const handleCancel = () => {
    // Implement cancel logic here (e.g., navigate back)
    console.log('Cancelling');
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h1>

      <form>
        <div>
          <label htmlFor="codigoCliente">Código do Cliente:</label>
          <input
            type="text"
            id="codigoCliente"
            value={codigoCliente}
            onChange={(e) => setCodigoCliente(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nomeEntidade">Nome da Entidade (*):</label>
          <input
            type="text"
            id="nomeEntidade"
            value={nomeEntidade}
            onChange={(e) => setNomeEntidade(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cnpj">CNPJ (*):</label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">E-mail (*):</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tipoCliente">Tipo de Cliente (*):</label>
          <select
            id="tipoCliente"
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Federação">Federação</option>
            <option value="Associação">Associação</option>
          </select>
        </div>

        <div>
          <button type="button" onClick={handleCancel}>Cancelar</button>
          <button type="button" onClick={handleSave}>Salvar</button>
        </div>
      </form>

      <style jsx>{`
        div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input[type="text"],
        input[type="email"],
        select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 15px;
          margin-right: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:first-child {
          background-color: #ccc;
        }
        button:last-child {
          background-color: #0070f3;
          color: white;
        }
      `}</style>
    </div>
  );
}