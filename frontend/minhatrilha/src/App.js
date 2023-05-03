import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';

function App() {
  return (
    <Form
      name="userForm"
    >
      <Form.Item
        name="name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default App;
