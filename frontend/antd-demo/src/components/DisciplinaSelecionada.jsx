import { Card, List, Collapse, Col, Row, Progress } from "antd";
import CountUp from 'react-countup';

const { Panel } = Collapse;

const tipoToKey = {
  'Disciplinas Obrigatórias': 'Ob',
  'Disciplinas Especializadas de Controle': 'Espc',
  'Disciplinas Especializadas de Mecatrônica': 'Espm',
  'Disciplinas Especializadas de Computação': 'Espcom',
  'Disciplinas Optativas de Engenharia': 'Ope',
};

export default function DisciplinaSelecionada({ item, totalPorTipo, restantePorTipo }) { 
  const key = tipoToKey[item.tipo];
  const total = totalPorTipo[key] || 0;
  const restante = restantePorTipo[key] || 0;


  return (
    <Card bordered={false} style={{ width: '100%', marginTop: 5 }}>
      <List.Item
        key={item.title}
      >
        <List.Item.Meta
          title={item.tipo}
        />
        <Row gutter={16}>
          <Col span={5}>
          <Progress type="circle" percent={Math.round(total / total * 100)} strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}/>

              <div style={{ textAlign: 'center' }}>
                <CountUp end={total} separator="," />
                <br />
                Horas Totais
              </div>
          </Col>
          <Col span={5}>
          <Progress type="circle" percent={Math.round(restante / total * 100)} strokeColor={{'0%': '#108ee9', '100%': '#87d068'}} />

              <div style={{ textAlign: 'center' }}>
                <CountUp end={restante} separator="," />
                <br />
                Horas Restantes
              </div>
          </Col>
        </Row>

        <Collapse accordion>
          <Panel header="Disciplinas Selecionadas" key={item.id}>
            {item.disciplinaMarcadas.map(materia => {
              return <Card bordered={true} style={{ width: '100%', marginTop: 5 }}>
                {materia.nome} -
                {materia.cargaHoraria}h
              </Card>
            })}
          </Panel>
        </Collapse>
      </List.Item>
    </Card>
  );
}
