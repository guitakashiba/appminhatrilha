import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Progress } from 'antd';
import api from './services/api';
import { useHistoricoDisciplina } from './hooks/useHistoricoDisciplina';

const Dashboard = () => {
  const [allDisciplinas, setAllDisciplinas] = useState([]);
  const [historicoDisciplinas, setHistoricoDisciplinas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, , typeToTitle] = useHistoricoDisciplina();
  const horasNecessarias = {
    Espc: 252,
    Espm: 252,
    Espcom: 252,
    Ope: 144,
    Comp: 54, 
};
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchAllDisciplinas = async () => {
      const res = await api.disciplinas.get();
      const data = await res.json();
      setAllDisciplinas(data);
    };

    const fetchHistoricoDisciplinas = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.id) {
        const res = await api.disciplinas.getConcluidas(storedUser.id);
        const data = await res.json();
        setHistoricoDisciplinas(data);
      }
    };

    fetchAllDisciplinas().then(fetchHistoricoDisciplinas).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const getProgress = (type) => {
    const completed = historicoDisciplinas.filter((disciplina) => disciplina.tipo === type);
    const completedCargaHoraria = completed.reduce((total, disciplina) => total + Number(disciplina.cargaHoraria), 0);
  
    let totalCargaHoraria;
    if (type === 'Ob') {
      const all = allDisciplinas.filter((disciplina) => disciplina.tipo === type);
      totalCargaHoraria = all.reduce((total, disciplina) => total + Number(disciplina.cargaHoraria), 0);
    } else {
      totalCargaHoraria = horasNecessarias[type];
    }
  
    const progress = (completedCargaHoraria / totalCargaHoraria) * 100;
  
    return Math.round(progress);
  };
  

  return (
    <div style={{ background: '#ECECEC', padding: '15px', minHeight: '75vh' }}>
      <Row gutter={16}>
      <Col span={24} style={{paddingBottom:'15px'}}> {/* Coluna para preencher toda a largura */}
        <Card>
          <h2>Bem-vindo, {user?.nome}</h2>
        </Card>
      </Col>
        {Object.keys(typeToTitle).map((tipo) => (
          <Col span={8} key={tipo}>
            <Card 
              title={typeToTitle[tipo]} 
              bordered={false}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Progress type="circle" percent={getProgress(tipo)}/>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
