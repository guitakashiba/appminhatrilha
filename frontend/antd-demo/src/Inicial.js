import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, List, Checkbox } from 'antd';
import './Inicial.css';
import api from './services/api';
import DisciplinasSelecionadas from './disciplinasSeleciondas';

function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [estadoCheckbox, setEstadoCheckbox] = useState({});
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState(
    // estrutura do estado inicial
  );

  useEffect(() => {
    api.disciplinas.get()
      .then(response => response.json())
      .then(data => {
        setDisciplinas(data);
        const estadoInicialCheckbox = {};
        data.forEach(disciplina => {
          estadoInicialCheckbox[disciplina.codigo] = false;
        });
        setEstadoCheckbox(estadoInicialCheckbox);
      });
  }, []);

  const cargaHorariaTipoTotal = useMemo(() => {
    return disciplinas.reduce((total, { tipo, cargaHoraria }) => {
      total[tipo] = (total[tipo] || 0) + Number(cargaHoraria);
      return total;
    }, {});
  }, [disciplinas]);

  const listaDisciplinasTipo = useMemo(() => {
    return disciplinas.reduce((total, { tipo, codigo, nome }) => {
      if (!total[tipo]) {
        total[tipo] = [];
      }
      total[tipo].push({ codigo, nome });
      return total;
    }, {});
  }, [disciplinas]);

  useEffect(() => {
    api.disciplinas.get()
      .then(response => response.json())
      .then(data => {
        setDisciplinas(data);
        const estadoInicialCheckbox = data.reduce((acc, disciplina) => ({
          ...acc,
          [disciplina.codigo]: false,
        }), {});
        setEstadoCheckbox(estadoInicialCheckbox);
      });
  }, []);

  const handleCheckboxChange = (disciplina, checked) => {
    setEstadoCheckbox(prevState => ({
      ...prevState,
      [disciplina.codigo]: checked,
    }));
    setDisciplinasSelecionadas(prevState => {
      const novoEstado = { ...prevState };
      if (checked) {
        novoEstado[disciplina.tipo].disciplinaMarcadas.push(disciplina);
        novoEstado[disciplina.tipo].cargaHorariaTotal += Number(disciplina.cargaHoraria);
      } else {
        const index = novoEstado[disciplina.tipo].disciplinaMarcadas.findIndex(d => d.id === disciplina.id);
        if (index > -1) {
          novoEstado[disciplina.tipo].disciplinaMarcadas.splice(index, 1);
          novoEstado[disciplina.tipo].cargaHorariaTotal -= Number(disciplina.cargaHoraria);
        }
      }
      return novoEstado;
    });
  };

  return (
    <div>
      <Card title="Usuario" bordered={true} style={{ marginBottom: 16, height:"100%"}}>
        {/* conteúdo do card */}
      </Card>

      <Card title="Lista de Disciplinas" bordered={true} style={{ marginBottom: 16 }}>
        <List
          itemLayout="horizontal"
          dataSource={disciplinas}
          renderItem={item => (
            <List.Item>
              <Checkbox
                checked={estadoCheckbox[item.codigo]}
                onChange={e => handleCheckboxChange(item, e.target.checked)}
              />
              <List.Item.Meta
                title={item.codigo + " - " + item.nome}
                ellipsis={true}
              />
            </List.Item>
          )}
          bordered={true}
          style={{ overflow: 'scroll', maxHeight: '400px' }}
        />
      </Card>

      <DisciplinasSelecionadas disciplinas={disciplinasSelecionadas}/>
      {/* <Card title="Carga Horária" bordered={true}>
        <p>{cargaHorariaTotal} horas</p>
      </Card> */}
    </div>
  );
}

export default TelaInicial;
