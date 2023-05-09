import { List, Card } from 'antd';
import DisciplinaSelecionada from './DisciplinaSelecionada';

function ResumoDisciplinas({ disciplinas, totalPorTipo, restantePorTipo }) {
  const dataFormatada = Object.values(disciplinas);
  console.log(dataFormatada, "data formatada");

  return (
    <div style={{ width: '80%', padding: 20 }}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={dataFormatada}
        footer={
          <Card>
            <span style={{ fontWeight: 'bold' }}>CARGA HORÁRIA TOTAL: </span>
            {dataFormatada.reduce((accumulator, currentObject) => {
              return accumulator + currentObject.cargaHorariaTotal;
            }, 0)}
          </Card>
        }
        renderItem={(item) => (
            <DisciplinaSelecionada
              key={item.tipo}
              item={item}
              totalPorTipo={totalPorTipo}
              restantePorTipo={restantePorTipo}
            />
        )}
      />
    </div>
  );
}

export default ResumoDisciplinas;
