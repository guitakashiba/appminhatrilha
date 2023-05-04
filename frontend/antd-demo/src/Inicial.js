import { useState, useEffect } from 'react';
import { Card, List, Checkbox } from 'antd';
import './Inicial.css';
import api from './services/api';


function TelaInicial() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [estadoCheckbox, setEstadoCheckbox] = useState({});
  const [cargaHorariaTotal, setCargaHorariaTotal] = useState(0);

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

  const handleCheckboxChange = (codigoDisciplina, checked, cargaHoraria) => {
    setEstadoCheckbox({
      ...estadoCheckbox,
      [codigoDisciplina]: checked,
    });
    if (checked) {
      setCargaHorariaTotal(cargaHorariaTotal + cargaHoraria);
    } else {
      setCargaHorariaTotal(cargaHorariaTotal - cargaHoraria);
    }
  };

  return (
    <div>
      <Card title="Usuario" bordered={true} style={{ marginBottom: 16 }}>
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
                onChange={e => handleCheckboxChange(item.codigo, e.target.checked, item.cargaHoraria)}
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

      <Card title="Carga Horária" bordered={true}>
        <p>{cargaHorariaTotal} horas</p>
      </Card>
    </div>
  );
}

export default TelaInicial;
