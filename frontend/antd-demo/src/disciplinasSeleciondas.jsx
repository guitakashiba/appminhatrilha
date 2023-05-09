import { Card, List, Collapse, Col, Row, Progress, useMemo } from "antd";

import CountUp from 'react-countup';
import './Inicial';


const { Panel } = Collapse;
const formatter = (value) => <CountUp end={value} separator="," />;

export default function DisciplinasSelecionadas({ disciplinas }) {

  let totalOb = 2970;

  const cargaHorariaTotal = useMemo(() => {
    return Object.values(disciplinas).reduce((accumulator, currentObject) => {
      return accumulator + currentObject.cargaHorariaTotal;
    }, 0);
  }, [disciplinas]);

  const dataFormatada = Object.values(disciplinas);
  return (
    <div style={{ width: '80%', padding: 20 }}>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={dataFormatada}
        footer={
          <Card>
            <span style={{ fontWeight: 'bold' }}>CARGA HORARIA TOTAL: </span>
            {dataFormatada.reduce((accumulator, currentObject) => {
              return accumulator + currentObject.cargaHorariaTotal;
            }, 0)}
          </Card>
        }
        renderItem={(item) => (
          <Card bordered={false} style={{ width: '100%', marginTop: 5 }}>
            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                title={item.tipo}
              />
              <Row gutter={16}>
                <Col span={5}>
                  <Progress type="circle" percent={Math.round(item.cargaHorariaTotal / totalOb * 100)} strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}/>
                  <div style={{ textAlign: 'center' }}>
                    <CountUp end={totalOb} separator="," />
                    <br />
                    Horas Necessárias
                  </div>
                </Col>
                <Col span={5}>
                  <Progress type="circle" percent={Math.round(item.cargaHorariaTotal / totalOb * 100)} strokeColor={{'0%': '#108ee9', '100%': '#87d068'}} />
                  <div style={{ textAlign: 'center' }}>
                    <CountUp end={item.cargaHorariaTotal} separator="," />
                    <br />
                    Horas Concluídas
                  </div>
                </Col>
              </Row>


              <Collapse accordion>
                <Panel header="Displinas Selecionada" key={item.id}>
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
        )
        }
      />
    </div >
  )
}