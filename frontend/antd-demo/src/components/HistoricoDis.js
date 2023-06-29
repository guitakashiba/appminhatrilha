//HistoricoDis.js
import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import UserContext from '../UserContext';
import api from '../services/api';

const HistoricoDis = () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      
      // Recuperar os dados do usuário do localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
        
      if (storedUser && storedUser.id) { 
        try {
          const res = await api.disciplinas.getConcluidas(storedUser.id);
          const data = await res.json();
          setDisciplinas(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
      
    fetchDisciplinas().catch(err => console.error(err));
  }, []);
  

  return (
    <List
      itemLayout="horizontal"
      dataSource={disciplinas}
      renderItem={disciplina => (
        <List.Item>
          <List.Item.Meta
            title={`${disciplina.codigo} - ${disciplina.nome}`}
            description={`Tipo: ${disciplina.tipo}, Carga Horária: ${disciplina.cargaHoraria}`}
          />
        </List.Item>
      )}
    />
  );
};

export default HistoricoDis;
