import React, { useState, useEffect } from 'react';
import { Card, Cascader } from 'antd';
import api from './services/api';
import DisciplinasOpe from './components/DisciplinasOpe';


const TelaInicial = () => {
  const [disciplinas, setDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
  });

  const [selectedDisciplinas, setSelectedDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
  });

  const [cargaHorariaTotal, setCargaHorariaTotal] = useState({
    Espc: 0,
    Espm: 0,
    Espcom: 0,
    Ope: 0,
    Ob: 0,
  });

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await api.disciplinas.get();
        const data = await response.json();

        const disciplinasPorTipo = data.reduce((acc, curr) => {
          if (curr.tipo === 'Espc' || curr.tipo === 'Espm' || curr.tipo === 'Espcom' || curr.tipo === 'Ope' || curr.tipo === 'Ob') {
            acc[curr.tipo].push(curr);
          }
          return acc;
        }, {
          Espc: [],
          Espm: [],
          Espcom: [],
          Ope: [],
          Ob: [],
        });

        setDisciplinas(disciplinasPorTipo);
      } catch (error) {
        console.error("Erro ao buscar as disciplinas", error);
      }
    };

    fetchDisciplinas();
  }, []);
  console.log('Conteúdo disciplinas:',disciplinas);

  const transformarDisciplinasEmOpcoes = (disciplinas, tipo) => {
    return disciplinas[tipo].map(disciplina => ({ 
      label: `${disciplina.codigo} - ${disciplina.nome}`, 
      value: disciplina.id, 
      data: disciplina }));
  };

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
  
    selectedOptions.forEach(opt => {
      if (opt.children) {
        opt.children.forEach(child => {
          const disc = disciplinas[tipo].find(d => d.id === child.value);
          if (disc) selectedDiscs.push(disc);
        });
      } else {
        const disc = disciplinas[tipo].find(d => d.id === opt.value);
        if (disc) selectedDiscs.push(disc);
      }
    });
  
    console.log('Disciplinas selecionadas:', selectedDiscs);
  
    setCargaHorariaTotal(prevState => {
      const updatedCargaHorariaTotal = { ...prevState };
  
      // Remove a carga horária total de disciplinas desmarcadas
      selectedDisciplinas[tipo].forEach(disc => {
        if (disc && !selectedDiscs.find(d => d.id === disc.id)) {
          updatedCargaHorariaTotal[tipo] -= Number(disc.cargaHoraria);
        }
      });

      // Adicione a carga horária total de novas disciplinas
      selectedDiscs.forEach(disc => {
        if (disc && !selectedDisciplinas[tipo].find(d => d.id === disc.id)) {
          updatedCargaHorariaTotal[tipo] += Number(disc.cargaHoraria);
        }
      });
  
      console.log('Carga horária total atualizada:', updatedCargaHorariaTotal); 
      return updatedCargaHorariaTotal;
    });
  
    setSelectedDisciplinas({ ...selectedDisciplinas, [tipo]: selectedDiscs });
  };
  


  const horasConcluidas = Object.values(selectedDisciplinas).reduce(
    (total, tipo) => {
      return (
        total +
        tipo.reduce((tipoTotal, disciplina) => {
          return tipoTotal + Number(disciplina?.cargaHoraria || 0);
        }, 0)
      );
    },
    0
  );
  console.log(horasConcluidas);

  const calcCargaHorariaTotal = {
    Espc: disciplinas['Espc'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Espm: disciplinas['Espm'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Espcom: disciplinas['Espcom'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Ope: disciplinas['Ope'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
    Ob: disciplinas['Ob'].reduce((acc, disc) => acc + Number(disc.cargaHoraria), 0),
  };

  return (
    <div>
      <Card>
        <Cascader
          style={{ width: '100%', marginBottom: '1rem', overflow: 'auto' }}
          options={transformarDisciplinasEmOpcoes(disciplinas, 'Espc')}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espc')}
          placeholder="Disciplinas Especializadas de Controle"
          multiple
        />
        <Cascader
          style={{ width: '100%', marginBottom: '1rem' }}
          options={transformarDisciplinasEmOpcoes(disciplinas, 'Espm')}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espm')}
          placeholder="Disciplinas Especializadas de Mecatronica"
          multiple
        />
        <Cascader
          style={{ width: '100%', marginBottom: '1rem' }}
          options={transformarDisciplinasEmOpcoes(disciplinas, 'Espcom')}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Espcom')}
          placeholder="Disciplinas Especializadas de Computação"
          multiple
        />
        <Cascader
          style={{ width: '100%', marginBottom: '1rem' }}
          options={transformarDisciplinasEmOpcoes(disciplinas, 'Ope')}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Ope')}
          placeholder="Disciplinas Optativas de Engenharia"
          multiple
        />
        <Cascader
          style={{ width: '100%', marginBottom: '1rem' }}
          options={transformarDisciplinasObrigatoriasEmOpcoes(disciplinas)}
          onChange={(value, selectedOptions) => onChange(value, selectedOptions, 'Ob')}
          placeholder="Disciplinas Obrigatórias"
          multiple
        />
      </Card>
      <Card>
        <p>Total de horas de Disciplinas Especializadas de Controle: {calcCargaHorariaTotal['Espc']}</p>
        <p>Total de horas de Disciplinas Especializadas de Mecatronica: {calcCargaHorariaTotal['Espm']}</p>
        <p>Total de horas de Disciplinas Especializadas de Computação: {calcCargaHorariaTotal['Espcom']}</p>
        <p>Total de horas de Disciplinas Optativas de Engenharia: {calcCargaHorariaTotal['Ope']}</p>
        <p>Total de horas de Disciplinas Obrigatórias: {calcCargaHorariaTotal['Ob']}</p>
      </Card>
      <Card>
        <DisciplinasOpe />
      </Card>
    </div>
  );
};

export default TelaInicial;
