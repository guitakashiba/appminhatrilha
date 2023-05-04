import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import "./Inicial.css";

function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplinas, setSelectedDisciplinas] = useState([]);
  const [cargaHorariaPorTipo, setCargaHorariaPorTipo] = useState({});

  useEffect(() => {
    fetch('http://localhost:3333/disciplinas')
      .then((response) => response.json())
      .then((data) => {
        setDisciplinas(data);

        // Obtém a carga horária por tipo de disciplina
        const cargaHorariaPorTipoObj = {};
        data.forEach((disciplina) => {
          const { tipo, cargaHoraria } = disciplina;
          if (cargaHorariaPorTipoObj[tipo]) {
            cargaHorariaPorTipoObj[tipo] += cargaHoraria;
          } else {
            cargaHorariaPorTipoObj[tipo] = cargaHoraria;
          }
        });
        setCargaHorariaPorTipo(cargaHorariaPorTipoObj);
      });
  }, []);

  useEffect(() => {
    // Obtém a carga horária selecionada pelo usuário
    const cargaHorariaSelecionadaPorTipoObj = {};
    selectedDisciplinas.forEach((disciplina) => {
      const { tipo, cargaHoraria } = disciplina;
      if (cargaHorariaSelecionadaPorTipoObj[tipo]) {
        cargaHorariaSelecionadaPorTipoObj[tipo] += cargaHoraria;
      } else {
        cargaHorariaSelecionadaPorTipoObj[tipo] = cargaHoraria;
      }
    });

    // Atualiza a carga horária total por tipo de disciplina
    setCargaHorariaPorTipo((prevState) => {
      const newState = { ...prevState };
      Object.entries(cargaHorariaSelecionadaPorTipoObj).forEach(([tipo, cargaHorariaSelecionada]) => {
        newState[tipo] -= cargaHorariaSelecionada;
      });
      return newState;
    });
  }, [selectedDisciplinas]);

  const handleCheckboxChange = (event) => {
    const codigoDisciplina = event.target.value;
    const disciplinaSelecionada = disciplinas.find((disciplina) => disciplina.codigo === codigoDisciplina);

    // Adiciona ou remove a disciplina da lista de selecionadas
    setSelectedDisciplinas((prevState) => {
      if (prevState.includes(disciplinaSelecionada)) {
        return prevState.filter((disciplina) => disciplina !== disciplinaSelecionada);
      } else {
        return [...prevState, disciplinaSelecionada];
      }
    });
  };
  

  return (
    <div className="main-container">
      <div className="disciplinas-container">
        <h2 className="disciplinas-title">Lista de Disciplinas</h2>
        <ul className="disciplinas-list">
        {disciplinas.map((disciplina, index) => (
            <li key={`${disciplina.codigo}-${index}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox value={disciplina.codigo} onChange={handleCheckboxChange}>{`${disciplina.codigo} - ${disciplina.nome}`}</Checkbox>
            </li>
            ))}
        </ul>
      </div>
      <div className="carga-horaria-container">
        <h2 className="carga-horaria-title">Carga Horária</h2>
        <ul className="carga-horaria-list">
          {Object.entries(cargaHorariaPorTipo).map(([tipo, cargaHoraria]) => (
            <li key={tipo}>{`${tipo}: ${cargaHoraria} horas`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TelaInicial
