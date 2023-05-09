import { useState, useEffect } from 'react';
import { Card, List, Checkbox } from 'antd';
import api from './services/api';
import ResumoDisciplinas from './components/ResumoDisciplinas';

function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [estadoCheckbox, setEstadoCheckbox] = useState({});
  const [totalPorTipo, setTotalPorTipo] = useState({});
  const [restantePorTipo, setRestantePorTipo] = useState({});
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
        // Calcula a carga horária total por tipo
        const totalPorTipo = calcularCargaHorariaTotalPorTipo(data);
        setTotalPorTipo(totalPorTipo);

        // Inicializa a carga horária restante por tipo
        setRestantePorTipo({ ...totalPorTipo });
      });
  }, []);


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
      disciplinasSelecionadas[disciplina.tipo].disciplinaMarcadas = currentDisciplinas.filter(current => current.id !== disciplina.id)
      disciplinasSelecionadas[disciplina.tipo].cargaHorariaTotal -= Number(disciplina.cargaHoraria)
      setDisciplinasSelecionadas({ ...disciplinasSelecionadas })
    }
    const totalPorTipo = calcularCargaHorariaTotalPorTipo(disciplinas);
    const restantePorTipo = { ...totalPorTipo };

    Object.keys(disciplinasSelecionadas).forEach(tipo => {
        restantePorTipo[tipo] -= disciplinasSelecionadas[tipo].cargaHorariaTotal;
    });

    const restantePorTipoAtualizado = { ...restantePorTipo };
    if (checked) {
      restantePorTipoAtualizado[disciplina.tipo] -= Number(disciplina.cargaHoraria);
    } else {
      restantePorTipoAtualizado[disciplina.tipo] += Number(disciplina.cargaHoraria);
    }
    setTotalPorTipo(totalPorTipo); // Atualiza totalPorTipo aqui
    setRestantePorTipo(restantePorTipoAtualizado); // Atualiza restantePorTipo aqui
  };
 

  function agruparPorTipo(disciplinas) {
    return disciplinas.reduce((grupos, disciplina) => {
      const tipo = disciplina.tipo;
      if (!grupos[tipo]) {
        grupos[tipo] = [];
      }
      grupos[tipo].push(disciplina);
      return grupos;
    }, {});
  }

  const disciplinasPorTipo = agruparPorTipo(disciplinas);

  function calcularCargaHorariaTotalPorTipo(disciplinas) {
    const totais = {
      'Ob': 0,
      'Espc': 0,
      'Espm': 0,
      'Espcom': 0,
      'Ope': 0,
    };
    
    disciplinas.forEach(disciplina => {
      totais[disciplina.tipo] += Number(disciplina.cargaHoraria);
    });
  
    return totais;
  }

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card title="Usuário" bordered={true} style={{ marginBottom: 16, height: "100%" }}>
        {/* Conteúdo do card */}
      </Card>

      {Object.entries(disciplinasPorTipo).map(([tipo, disciplinasDoTipo]) => (
        <Card title={`Lista de Disciplinas - ${tipo}`} bordered={true} style={{ marginBottom: 16 }}>
          <List
            itemLayout="horizontal"
            dataSource={disciplinasDoTipo}
            bordered={true}
            style={{ overflow: 'auto', maxHeight: '400px' }}
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
          />
        </Card>
      ))}

        <ResumoDisciplinas
            disciplinas={disciplinasSelecionadas}
            totalPorTipo={totalPorTipo}
            restantePorTipo={restantePorTipo}
        />
    </div>
  );
}



export default TelaInicial;