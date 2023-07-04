//TelaInicial.js
import React, { useState, useEffect } from 'react';
import { Card, Cascader, Progress, message, Col, Row, Button, notification, Select } from 'antd';
import api from './services/api';
import { useHistoricoDisciplina } from './hooks/useHistoricoDisciplina';

const TelaInicial = () => {
  const [disciplinas, setDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
    Comp: [],
  });

  const [selectedDisciplinas, setSelectedDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
    Comp: [],
  });

  const [cargaHorariaTotal, setCargaHorariaTotal] = useState({
    Espc: 0,
    Espm: 0,
    Espcom: 0,
    Ope: 0,
    Ob: 0,
    Comp: 0,
  });

  const [messageShown, setMessageShown] = useState({
    Espc: false,
    Espm: false,
    Espcom: false,
    Ope: false,
    Ob: false,
    Comp: false,
  });

  const [user, setUser] = useState(null);

  const [selectedDisHistorico, setSelectedDisHistorico] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
    Comp: [],
})
  const [historicoDisciplinas, processaHistoricoDisciplinas] = useHistoricoDisciplina()

  useEffect(() => {
    console.log('disciplinaaaas -> ', historicoDisciplinas)
    if(historicoDisciplinas.length > 0){
      setSelectedDisHistorico(processaHistoricoDisciplinas())
    }
  }, [historicoDisciplinas])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.disciplinas.get();
        const data = await response.json();
  
        // Cria um objeto com todas as disciplinas separando por tipo
        const disciplinasPorTipo = data.reduce((acc, curr) => {
          if (curr.tipo === 'Espc' || curr.tipo === 'Espm' || curr.tipo === 'Espcom' || curr.tipo === 'Ope' || curr.tipo === 'Ob' || curr.tipo === 'Comp') {
            acc[curr.tipo].push(curr);
          }
          return acc;
        }, {
          Espc: [],
          Espm: [],
          Espcom: [],
          Ope: [],
          Ob: [],
          Comp: [],
        });
  
        setDisciplinas(disciplinasPorTipo);
  
      } catch (error) {
        console.error("Erro ao buscar as disciplinas", error);
      }
  
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }  
    })();
  }, []);
  
  console.log('HISTORICO SALVO ---->  ', selectedDisHistorico)

  //Função que transforma as disciplinas em opções dentro dos Cascaders
  const transformarDisciplinasEmOpcoes = (disciplinas, tipo) => {
    return disciplinas[tipo].map(disciplina => ({ 
      label: `${disciplina.codigo} - ${disciplina.nome}`, 
      value: disciplina.id, 
      }));
  };

  //Função que transforma as disciplinas Obrigatórias em opções dentro do Cascader com children
  const transformarDisciplinasObrigatoriasEmOpcoes = (disciplinas) => {
    const semestres = [...new Set(disciplinas.Ob.map(disciplina => disciplina.semestre))];

    return semestres.map(semestre => ({
      label: `Semestre ${semestre}`,
      value: semestre,
      children: disciplinas.Ob.filter(disciplina => disciplina.semestre === semestre).map(disciplina => (
        { 
          label: `${disciplina.codigo} - ${disciplina.nome}`, 
          value: disciplina.id 
        })),
    }));
  };

  const onChange = (value, selectedOptions, tipo) => {
    let selectedDiscs = [];
    // Lógica para quando as disciplinas são selecionadas, sendo um pai ou children
    selectedOptions.forEach(opt => {
      if (opt[0]?.children && opt.length !== 2) {
        opt[0]?.children.forEach(child => {
          const disc = disciplinas[tipo].find(d => d.id === child.value);
          if (disc) selectedDiscs.push(disc);
        });
      } else {
        debugger
        const disc = disciplinas[tipo].find(d => d.id === (opt.value || (opt[1] || opt[0]).value));
        if (disc) selectedDiscs.push(disc);
      }
    });

    const currentDisciplinas = selectedDisciplinas
    setCargaHorariaTotal(prevState => {
      const updatedCargaHorariaTotal = { ...prevState };
  
      // Remove a carga horária total de disciplinas desmarcadas
      currentDisciplinas[tipo].forEach(disc => {
        if (disc && !selectedDiscs.find(d => d.id === disc.id)) {
          updatedCargaHorariaTotal[tipo] -= Number(disc.cargaHoraria);
        }
      });

      // Adicione a carga horária total de disciplinas selecionadas
      selectedDiscs.forEach(disc => {
        if (disc && !currentDisciplinas[tipo].find(d => d.id === disc.id)) {
          updatedCargaHorariaTotal[tipo] += Number(disc.cargaHoraria);
        }
      });
  
      return updatedCargaHorariaTotal;

    });

//******************[INICIO] Cálculo das cargas Horárias de cada tipo seguindo as exigências do Curriculo [INICIO]
    const novaCargaHorariaTotal = { ...cargaHorariaTotal };
    novaCargaHorariaTotal[tipo] = selectedDiscs.reduce(
      (total, disc) => total + Number(disc.cargaHoraria || 0),
      0
    );
  
    setCargaHorariaTotal(novaCargaHorariaTotal);
  
    if (tipo === 'Espc' || tipo === 'Espm' || tipo === 'Espcom') {
      if (novaCargaHorariaTotal[tipo] >= 252 && !messageShown[tipo]) {
        message.success({
          content: 'Você atingiu as horas necessárias DENTRO DE UMA ESPECIALIZADA.',
          key: tipo,
          duration: 3,
          onClose: () =>
            setMessageShown((prev) => ({ ...prev, [tipo]: false })),
        });
        setMessageShown((prev) => ({ ...prev, [tipo]: true }));
      };
    };
    console.log("Carga horaria: ",novaCargaHorariaTotal);

    if (cargaHorariaTotal['Espc'] + cargaHorariaTotal['Espm'] + cargaHorariaTotal['Espcom'] >= 540 && messageShown) {
      message.success({
        content: 'Você atingiu a carga horária exigida NAS DISCIPLINAS ESPECIALIZADAS.',
        //key: 'especializadas',
        key: tipo,
        duration: 3,
        onClose: () =>
          setMessageShown((prev) => ({ ...prev, 'Espc': false, 'Espm': false, 'Espcom': false })),
      });
      console.log("saiu da msg", [tipo]);

      setMessageShown((prev) => ({ ...prev, 'Espc': true, 'Espm': true, 'Espcom': true }));
    }

    if (tipo === 'Ope' && novaCargaHorariaTotal[tipo] >= 144 && !messageShown[tipo]) {
      message.success({
        content: 'Você atingiu as horas necessárias dentro das Optativas de Engenharia',
        key: tipo,
        duration: 3,
        onClose: () =>
          setMessageShown((prev) => ({ ...prev, [tipo]: false })),
      });
      console.log("Dentro de OPE: ", [tipo]);
      setMessageShown((prev) => ({ ...prev, [tipo]: true }));
    }

    if (tipo === 'Comp' && novaCargaHorariaTotal[tipo] >= 54 && !messageShown[tipo]) {
      message.success({
        content: 'Você atingiu as horas necessárias dentro das Optativas Complementares',
        key: tipo,
        duration: 3,
        onClose: () =>
          setMessageShown((prev) => ({ ...prev, [tipo]: false })),
      });
      setMessageShown((prev) => ({ ...prev, [tipo]: true }));
    }
//******************[FIM] Cálculo das cargas Horárias de cada tipo seguindo as exigências do Curriculo [FIM]
    
    debugger
    setSelectedDisciplinas({ ...selectedDisciplinas, [tipo]: selectedDiscs });
    setSelectedDisHistorico({...selectedDisHistorico, [tipo]:  selectedDiscs.map(disc=>disc.id)})
    const storedSelectedDisciplinas = JSON.parse(localStorage.getItem('selectedDisciplinas'));

    console.log("Disciplinas Selecionadas Salvas: ", storedSelectedDisciplinas);


  };
  
  //Cálculo das cargas Horárias total de cada tipo
  const calcCargaHorariaTotal = {
    Espc: disciplinas['Espc'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Espm: disciplinas['Espm'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Espcom: disciplinas['Espcom'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Ope: disciplinas['Ope'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Ob: disciplinas['Ob'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Comp: disciplinas['Comp'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
  };

  //Definição das horas necessárias para concluir cada área de disciplina
  const horasEspecializadasMax = {
    Espc: 252,
    Espm: 252,
    Espcom: 252,
    Ope: 144,
    Comp: 54, 
  };

  const salvarDisciplinas = async() => {
    try {

        if (!user) {
            throw new Error('Usuário não logado');
        }

        const disciplinasToUpdate = [].concat(...Object.values(selectedDisciplinas)).map(disciplina => ({
          usuarioId: user.id,
          disciplinaId: disciplina.id,
        }));

        const response = await api.user.update(user.id, { disciplinas: disciplinasToUpdate });

        if (!response.ok) {
            throw new Error('Erro ao salvar disciplinas');
        }

        notification.success({
            message: 'Disciplinas salvas com sucesso!',
            duration: 3,
        });
        
    } catch (error) {
        console.error('Erro ao salvar disciplinas:', error);
        notification.error({
            message: 'Erro ao salvar disciplinas. Por favor, tente novamente.',
            duration: 3,
        });
    }
  };

  
 console.log(user);

  const opcoesEspc = transformarDisciplinasEmOpcoes(disciplinas, 'Espc')
  const opcoesEspm = transformarDisciplinasEmOpcoes(disciplinas, 'Espm')
  const opcoesEspcom = transformarDisciplinasEmOpcoes(disciplinas, 'Espcom')
  const opcoesOpe = transformarDisciplinasEmOpcoes(disciplinas, 'Ope')
  const opcoesComp = transformarDisciplinasEmOpcoes(disciplinas, 'Comp')

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
      <Card>
        <h2>Bem-vindo, {user?.nome}</h2>
      </Card>
      <Card title="Disciplinas Obrigatórias">
        <Cascader
          style={{ width: '100%', marginBottom: '1rem' }}
          options={transformarDisciplinasObrigatoriasEmOpcoes(disciplinas)}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Ob')}
          placeholder="Selecione as Disciplinas Obrigatórias"
          multiple
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Progress 
              type="circle"
              percent={
                  Math.round(
                      (cargaHorariaTotal['Ob'] / calcCargaHorariaTotal['Ob']) * 100
                  )
              } 
              strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
          />
          <p>Horas concluídas: {cargaHorariaTotal['Ob']}</p>
        </div>
      </Card>
      <Card>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Especializadas de Controle" bordered={false}>
              <Select
                
                value={selectedDisHistorico['Espc']}
                style={{ width: '100%', marginBottom: '1rem', overflow: 'auto' }}
                options={opcoesEspc}
                onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espc')}
                placeholder="Disciplinas Especializadas de Controle"
                  mode="multiple"
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Progress 
                type="circle"
                percent={
                  Math.round(
                    (cargaHorariaTotal['Espc'] / horasEspecializadasMax['Espc']) * 100
                  )
                }
                strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
              />
              <p>Horas concluídas: {cargaHorariaTotal['Espc']}</p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Especializadas de Mecatrônica" bordered={false}>
              <Select
                style={{ width: '100%', marginBottom: '1rem' }}
                
                value={selectedDisHistorico['Espm']}
                options={opcoesEspm}
                onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espm')}
                placeholder="Disciplinas Especializadas de Mecatronica"
                  mode="multiple"
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Progress 
                type="circle"
                percent={
                    Math.round(
                        (cargaHorariaTotal['Espm'] / horasEspecializadasMax['Espm']) * 100
                    )
                } 
                strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
              />
              <p>Horas concluídas: {cargaHorariaTotal['Espm']}</p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Especializadas de Computação" bordered={false}>
              <Select
                style={{ width: '100%', marginBottom: '1rem' }}
                
                value={selectedDisHistorico['Espcom']}
                options={opcoesEspcom}
                onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espcom')}
                placeholder="Disciplinas Especializadas de Computação"
                  mode="multiple"
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Progress 
                type="circle"
                percent={
                    Math.round(
                        (cargaHorariaTotal['Espcom'] / horasEspecializadasMax['Espcom']) * 100
                    )
                } 
                strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
              />
              <p>Horas concluídas: {cargaHorariaTotal['Espcom']}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card title="Disciplinas Optativas na Área das Engenharias">
        <Select
          style={{ width: '100%', marginBottom: '1rem' }}
          
          value={selectedDisHistorico['Ope']}
          options={opcoesOpe}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Ope')}
          placeholder="Disciplinas Optativas de Engenharia"
            mode="multiple"
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Progress 
            type="circle"
            percent={
                Math.round(
                    (cargaHorariaTotal['Ope'] / horasEspecializadasMax['Ope']) * 100
                )
            } 
            strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
        />
        <p>Horas concluídas: {cargaHorariaTotal['Ope']}</p>
        </div>
      </Card>
      <Card title="Disciplinas Complementares">
        <Select
          style={{ width: '100%', marginBottom: '1rem' }}
          
          value={selectedDisHistorico['Comp']}
          options={opcoesComp}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Comp')}
          placeholder="Disciplinas Complementares"
            mode="multiple"
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Progress 
          type="circle"
          percent={
              Math.round(
                  (cargaHorariaTotal['Comp'] / horasEspecializadasMax['Comp']) * 100
              )
          } 
          strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
        />
        <p>Horas concluídas: {cargaHorariaTotal['Comp']}</p>
        </div>
      </Card>
      <Button type='primary' block onClick={salvarDisciplinas}>
          Salvar
      </Button>
    </div>
  );
};

export default TelaInicial;