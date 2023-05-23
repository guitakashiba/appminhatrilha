// Tela Inicial
import { useState, useEffect, useContext } from 'react';
import { Card, List, Checkbox, Cascader } from 'antd';
import api from './services/api';
import ResumoDisciplinas from './components/ResumoDisciplinas';
import UserContext from './UserContext';

function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [estadoCheckbox, setEstadoCheckbox] = useState({});
  const [totalPorTipo, setTotalPorTipo] = useState({});
  const [restantePorTipo, setRestantePorTipo] = useState({});
  const [opcoesCascader, setOpcoesCascader] = useState([]);
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
    const fetchDisciplinas = async () => {
      try {
        const response = await api.disciplinas.get();
        const data = await response.json();
        setDisciplinas(data);
        const estadoInicialCheckbox = {};
        data.forEach(disciplina => {
          estadoInicialCheckbox[disciplina.codigo] = false;
        });
        setEstadoCheckbox(estadoInicialCheckbox);
  
        const totalPorTipo = calcularCargaHorariaTotalPorTipo(data);
        setTotalPorTipo(totalPorTipo);
  
        setRestantePorTipo({ ...totalPorTipo });
  
        const opcoesCascader = transformarDisciplinasEmOpcoes(data);
        setOpcoesCascader(opcoesCascader);
  
      } catch (error) {
        console.error("Erro ao buscar as disciplinas", error);
      }
    };
  
    fetchDisciplinas();
  }, []);
  

  const handleCheckboxChange = (disciplina, checked) => {
    console.log("handleCheckboxChange foi chamada");

    setEstadoCheckbox(prevEstado => ({
      ...prevEstado,
      [disciplina.codigo]: checked,
    }));
  
    setDisciplinasSelecionadas(prevDisciplinas => {
      const disciplinasAtualizadas = { ...prevDisciplinas };
  
      if (checked) {
        disciplinasAtualizadas[disciplina.tipo].disciplinaMarcadas.push(disciplina)
        disciplinasAtualizadas[disciplina.tipo].cargaHorariaTotal += Number(disciplina.cargaHoraria)
      } else {
        const currentDisciplinas = disciplinasAtualizadas[disciplina.tipo].disciplinaMarcadas;
        disciplinasAtualizadas[disciplina.tipo].disciplinaMarcadas = currentDisciplinas.filter(current => current.id !== disciplina.id);
        disciplinasAtualizadas[disciplina.tipo].cargaHorariaTotal -= Number(disciplina.cargaHoraria);
      }
  
      return disciplinasAtualizadas;
    });
  
    // Agora vamos atualizar o total e restante de horas de acordo com as mudanças feitas
    setRestantePorTipo(prevRestante => {
      const restanteAtualizado = { ...prevRestante };
  
      if (checked) {
        restanteAtualizado[disciplina.tipo] -= Number(disciplina.cargaHoraria);
      } else {
        restanteAtualizado[disciplina.tipo] += Number(disciplina.cargaHoraria);
      }
  
      return restanteAtualizado;
    });
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

  function transformarDisciplinasEmOpcoes(disciplinas) {
    const disciplinasPorSemestre = agruparPorSemestre(disciplinas);
  
    const opcoes = Object.keys(disciplinasPorSemestre).map(semestre => {
      return {
        value: semestre,
        label: `Semestre ${semestre}`,
        children: disciplinasPorSemestre[semestre].map(disciplina => ({
          value: disciplina.codigo,
          label: `${disciplina.codigo} - ${disciplina.nome}`,
        })),
      };
    });
  
    return opcoes;
  }
  
  const handleCascaderChange = (value, selectedOptions) => {
    value.forEach((selectedValues, i) => {
      // `selectedValues` contém os valores selecionados em um nível
      selectedValues.forEach(selectedValue => {
        // Encontre a opção selecionada correspondente
        const selectedOption = selectedOptions[i].find(option => option.value === selectedValue);
        
        // Se a opção selecionada for um semestre (i.e., estiver no primeiro nível)
        if (selectedOption.children != null) {
          selectedOption.children.forEach(child => {
            const disciplina = disciplinas.find(disciplina => disciplina.codigo === child.value);
            if (disciplina && !estadoCheckbox[child.value]) {
              handleCheckboxChange(disciplina, true);
            }
          });
        } 
        // Se a opção selecionada for uma disciplina (i.e., estiver no segundo nível)
        else {
          const disciplina = disciplinas.find(disciplina => disciplina.codigo === selectedOption.value);
          if (disciplina) {
            const checked = !estadoCheckbox[selectedOption.value];
            handleCheckboxChange(disciplina, checked);
          }
        }
      });
    });
  };

  function agruparPorSemestre(disciplinas) {
    return disciplinas.reduce((grupos, disciplina) => {
      if (disciplina.tipo === 'Ob') {
        const semestre = disciplina.semestre;
        if (!grupos[semestre]) {
          grupos[semestre] = [];
        }
        grupos[semestre].push(disciplina);
      }
      return grupos;
    }, {});
  }
  
  const { user } = useContext(UserContext);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card title="Usuário" bordered={true} style={{ marginBottom: 16, height: "100%" }}>
        {user && (
          <div>
            <p>Nome: {user.nome}</p>
            <p>Matrícula: {user.matricula}</p>
          </div>
        )}
      </Card >

      <Card title="Lista Disciplinas" bordered={true} style={{ marginBottom: 16, height: "100%" }}>
        <Cascader
          options={opcoesCascader}
          onChange={handleCascaderChange}
          placeholder="Por favor selecione"
          multiple
        />

      </Card>

        <ResumoDisciplinas
            disciplinas={disciplinasSelecionadas}
            totalPorTipo={totalPorTipo}
            restantePorTipo={restantePorTipo}
        />
    </div>
  );
}

export default TelaInicial;