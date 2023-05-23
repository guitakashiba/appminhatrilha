//ListaDisciplinas.jsx
import { Card, List, Checkbox } from 'antd';

function ListaDisciplinas({ disciplinas, estadoCheckbox, handleCheckboxChange }) {
  return (
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
  );
}

export default ListaDisciplinas;

