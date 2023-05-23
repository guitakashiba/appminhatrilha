import React, { useState, useEffect } from 'react';
import { Card, Checkbox } from 'antd';
import api from '../services/api';

const DisciplinasOpe = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplinas, setSelectedDisciplinas] = useState([]);
  const [cargaHorariaTotal, setCargaHorariaTotal] = useState(0);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await api.disciplinas.get();
        const data = await response.json();
        const disciplinasOpe = data.filter(disciplina => disciplina.tipo === 'Ope');
        setDisciplinas(disciplinasOpe);
      } catch (error) {
        console.error("Erro ao buscar as disciplinas", error);
      }
    };

    fetchDisciplinas();
  }, []);

  const handleCheck = (disciplina, isChecked) => {
    const cargaHoraria = Number(disciplina.cargaHoraria);
    if (isChecked) {
      setCargaHorariaTotal(prev => prev + cargaHoraria);
      setSelectedDisciplinas(prev => [...prev, disciplina]);
    } else {
      setCargaHorariaTotal(prev => prev - cargaHoraria);
      setSelectedDisciplinas(prev => prev.filter(d => d.id !== disciplina.id));
    }
  };

  return (
    <div>
      {disciplinas.map(disciplina => (
        <Card key={disciplina.id} style={{ width: 300, marginTop: 16 }}>
          <Checkbox onChange={e => handleCheck(disciplina, e.target.checked)}>
            {disciplina.codigo} - {disciplina.nome}
          </Checkbox>
        </Card>
      ))}
      <div>Carga horária total: {cargaHorariaTotal}</div>
    </div>
  );
};

export default DisciplinasOpe;
