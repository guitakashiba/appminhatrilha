import { Card, List, Collapse, Statistic, Col, Row } from "antd";
import CountUp from 'react-countup';
const { Panel } = Collapse;
const formatter = (value) => <CountUp end={value} separator="," />;

export default function DisciplinasSelecionadas({ disciplinas }) {

  let totalOb = 2970;
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
                // avatar={<Avatar src={item.avatar} />}
                title={item.tipo}
                description={<span style={{ width: 500 }}>{'Carga Horária Selecionada: ' + item.cargaHorariaTotal}</span>}
                style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              />
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total de Horas Necessarias" value={totalOb} formatter={formatter} />
                </Col>
                <Col span={12}>
                  <Statistic title="Total de Horas Concluídas" value={item.cargaHorariaTotal} precision={2} formatter={formatter} />
                </Col>
                <Col span={12}>
                  <Statistic title="Total de Horas Restantes" value={totalOb-item.cargaHorariaTotal} precision={2} formatter={formatter} />
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