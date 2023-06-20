//HistoricoDis.js
import React, { useState, useEffect, useContext } from 'react';
import { List } from 'antd';
import UserContext from '../UserContext';
import api from '../services/api';

const HistoricoDis = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  //const { user } = useContext(UserContext);

  /*
  useEffect(() => {
    const fetchDisciplinas = async () => {
      console.log("fetch foi chamado")
      console.log(user)
      
      if (user) {

        try {
          const res = await api.disciplinas.getConcluidas(user.id);
          const data = await res.json();
          setDisciplinas(data);
          console.log(data)
        } catch (err) {
          console.error(err);
        }
      }
    };
    
    fetchDisciplinas().catch(err => console.error(err));
  }, [user]);
  */
  useEffect(() => {
    const fetchDisciplinas = async () => {
      console.log("fetch foi chamado");
      
      // Recuperar os dados do usuário do localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
        
      if (storedUser && storedUser.id) { 
        try {
          const res = await api.disciplinas.getConcluidas(storedUser.id);
          const data = await res.json();
          setDisciplinas(data);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }
      console.log(storedUser)
    };
      
    fetchDisciplinas().catch(err => console.error(err));
  }, []);
  

  return (
    <List
      itemLayout="horizontal"
      dataSource={disciplinas}
      renderItem={disciplina => (
        <List.Item>
          <List.Item.Meta
            //avatar={<Avatar icon={<UserOutlined />} />}
            title={`${disciplina.codigo} - ${disciplina.nome}`}
            description={`Carga Horária: ${disciplina.cargaHoraria}`}
          />
        </List.Item>
      )}
    />
  );
};

export default HistoricoDis;
