//HistoricoDis.js
import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import UserContext from '../UserContext';
import api from '../services/api';
import { useHistoricoDisciplina } from '../hooks/useHistoricoDisciplina';

const HistoricoDis = () => {
  const [historicoDisciplinas] = useHistoricoDisciplina()

  return (
    <List
      itemLayout="horizontal"
      dataSource={historicoDisciplinas}
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
