import { useState, useEffect } from 'react';
import { Card, List, Checkbox } from 'antd';
import './Inicial.css';
import api from './services/api';
import MeuComponente from './meuComponente';
import DisciplinasSelecionadas from './disciplinasSeleciondas';
// Teste commit mathias_branch

function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [estadoCheckbox, setEstadoCheckbox] = useState({});
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState(
    {
      'Ob': {
        tipo: 'Disciplinas Obrigatórias',
        disciplinaMarcadas: [],
        cargaHorariaTotal: 0
      },
      'Espc': {
        tipo: 'Disciplinas Especializadas de Controle',
        disciplinaMarcadas: [],
        cargaHorariaTotal: 0
      },
      'Espm': {
        tipo: 'Disciplinas Especializadas de Mecatrônica',
        disciplinaMarcadas: [],
        cargaHorariaTotal: 0
      },
      'Espcom': {
        tipo: 'Disciplinas Especializadas de Computação',
        disciplinaMarcadas: [],
        cargaHorariaTotal: 0
      },
      'Ope': {
        tipo: 'Disciplinas Optativas de Engenharia',
        disciplinaMarcadas: [],
        cargaHorariaTotal: 0
      }
    }
  )
 
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

  useEffect(() => {
    console.log(disciplinasSelecionadas)
  }, [disciplinasSelecionadas])

  const showAlert = (valor) => {
    alert(valor)
  }

  const handleCheckboxChange = (disciplina, checked) => {
    setEstadoCheckbox({
      ...estadoCheckbox,
      [disciplina.codigo]: checked,
    });
    if (checked) {
      disciplinasSelecionadas[disciplina.tipo].disciplinaMarcadas.push(disciplina)
      disciplinasSelecionadas[disciplina.tipo].cargaHorariaTotal += Number(disciplina.cargaHoraria)
      setDisciplinasSelecionadas({ ...disciplinasSelecionadas })
    } else {
      const currentDisciplinas = disciplinasSelecionadas[disciplina.tipo].disciplinaMarcadas
      disciplinasSelecionadas[disciplina.tipo].disciplinaMarcadas = currentDisciplinas.filter(current => current.id != disciplina.id)
      disciplinasSelecionadas[disciplina.tipo].cargaHorariaTotal -= Number(disciplina.cargaHoraria)
      setDisciplinasSelecionadas({ ...disciplinasSelecionadas })
    }
  };

  const disciplinasPorTipo = disciplinas.reduce((disciplinasAgrupadas, disciplinaAtual) => {
    if (!disciplinasAgrupadas[disciplinaAtual.tipo]) {
      disciplinasAgrupadas[disciplinaAtual.tipo] = [];
    }
    disciplinasAgrupadas[disciplinaAtual.tipo].push(disciplinaAtual);
    return disciplinasAgrupadas;
  }, {});
  
  const disciplinasObrigatorias = disciplinasPorTipo['Ob'];
  const disciplinasEspecializadasControle = disciplinasPorTipo['Espc'];
  const disciplinasEspecializadasMecatronica = disciplinasPorTipo['Espm'];
  const disciplinasEspecializadasComputacao = disciplinasPorTipo['Espcom'];
  const disciplinasOptativasEngenharia = disciplinasPorTipo['Ope'];

  
  return (
    <div>
      <Card title="Usuario" bordered={true} style={{ marginBottom: 16 }}>
        {/* conteúdo do card */}
        <p></p>
      </Card>

      {/* <MeuComponente funcao={showAlert} name={'Takashiba'} >
        <button>Teste</button>
      </MeuComponente> */}

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
      <DisciplinasSelecionadas  disciplinas={disciplinasSelecionadas}/>
      {/* <Card title="Carga Horária" bordered={true}>
        <p>{cargaHorariaTotal} horas</p>
      </Card> */}
    </div>
  );
}

export default TelaInicial;
