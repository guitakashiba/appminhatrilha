//TelaInicial2.js

import React, {useState, useEffect} from "react";
import { Card, Cascader, Progress, message, Col, Row, Button, notification } from 'antd';
import api from './services/api';
import { response } from "express";

const TelaInicial2 = () =>{
  const [user, setUser] = useState(null);

  const [disciplinas, setDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
    Comp: [],
  });

  const [selectedDisciplinas, setSelectedDisciplinas] = useState({
    Espc: [],
    Espm: [],
    Espcom: [],
    Ope: [],
    Ob: [],
    Comp: [],
  });


  useEffect(() => {
    (async () => {
      try{
        const response = await api.disciplinas.get();
        const dataDisciplinas = await response.json;

        const disciplinasPorTipo = dataDisciplinas.reduce((acc, curr) => {
          if (curr.tipo === 'Espc' || curr.tipo === 'Espm' || curr.tipo === 'Espcom' || curr.tipo === 'Ope' || curr.tipo === 'Ob' || curr.tipo === 'Comp') {
            acc[curr.tipo].push(curr);
          }
          return acc;
        }, {
          Espc: [],
          Espm: [],
          Espcom: [],
          Ope: [],
          Ob: [],
          Comp: [],
        });

        setDisciplinas(disciplinasPorTipo);
        console.log(disciplinas);

      } catch(error){
        console.log("Erro ao buscar disciplinas", error);

      }
    })();

  }, []);

  return(
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}></div>
  );
};

export default TelaInicial2;