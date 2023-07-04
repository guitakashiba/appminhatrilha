//HistoricoDis.js
import React from 'react';
import { List, Typography, Result, Button } from 'antd';
import { useHistoricoDisciplina } from '../hooks/useHistoricoDisciplina';
import { useNavigate, useNavigationType } from 'react-router-dom'; // Importação necessária para redirecionamento

const { Title } = Typography;

const HistoricoDis = () => {
  const navigate = useNavigate(); // Função useHistory para redirecionamento
  const [, processaHistoricoDisciplinas, typeToTitle] = useHistoricoDisciplina();
  const disciplinasSalvas = processaHistoricoDisciplinas();

  const isEmpty = !Object.values(disciplinasSalvas).flat().length;  // Verifica se o objeto disciplinasSalvas está vazio

  return (
    <>
      {isEmpty ? (
        <Result
          style={{height:'75vh'}}
          status="warning"
          title="Nenhuma disciplina foi adicionada."
          extra={
            <Button type="primary" onClick={() => navigate('/disciplinas')}>
              Ir para Disciplinas
            </Button>
          }
        />
      ) : (
        Object.keys(disciplinasSalvas).map((tipo) => {
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
        })
      )}
    </>
  );
};

export default HistoricoDis;
