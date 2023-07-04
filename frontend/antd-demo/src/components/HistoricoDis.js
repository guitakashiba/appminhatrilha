//HistoricoDis.js
import React from 'react';
import { List, Typography } from 'antd';
import { useHistoricoDisciplina } from '../hooks/useHistoricoDisciplina';

const { Title } = Typography;

const HistoricoDis = () => {
  const [, processaHistoricoDisciplinas, typeToTitle] = useHistoricoDisciplina();
  const disciplinasSalvas = processaHistoricoDisciplinas();

  return (
    <>
      {Object.keys(disciplinasSalvas).map((tipo) => {
        if (disciplinasSalvas[tipo].length === 0) return null;

        return (
          <div key={tipo}>
            <Title level={4}>{typeToTitle[tipo]}</Title>
            <List
              itemLayout="horizontal"
              dataSource={disciplinasSalvas[tipo]}
              renderItem={disciplina => (
                <List.Item>
                  <List.Item.Meta
                    title={`${disciplina.codigo} - ${disciplina.nome}`}
                    description={`Carga Horária: ${disciplina.cargaHoraria}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      })}
    </>
  );
};

export default HistoricoDis;