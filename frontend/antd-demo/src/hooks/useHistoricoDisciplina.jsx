import { useEffect, useState } from "react";
import api from "../services/api";

export function useHistoricoDisciplina(){

    const [historicoDisciplinas, setHistoricoDisciplinas] = useState([])

    useEffect(() => {
        const fetchDisciplinas = async () => {
          
          // Recuperar os dados do usuário do localStorage
          const storedUser = JSON.parse(localStorage.getItem('user'));
            
          if (storedUser && storedUser.id) { 
            try {
              const res = await api.disciplinas.getConcluidas(storedUser.id);
              const data = await res.json();
              setHistoricoDisciplinas(data);
            } catch (err) {
              console.error(err);
            }
          }
        };
          
        fetchDisciplinas().catch(err => console.error(err));
      }, []);
      console.log("historico: ", historicoDisciplinas);
  
      const typeToTitle = {
        Ob: 'Obrigatórias',
        Espc: 'Especializadas de Controle',
        Espm: 'Especializadas de Mecatronica',
        Espcom: 'Especializadas de Computação',
        Ope: 'Optativas de Engenharia',
        Comp: 'Complementares'
      };
    
      function processaHistoricoDisciplinas() {
        const disciplinasSalvas = Object.keys(typeToTitle).reduce((result, tipo) => {
          result[tipo] = [];
          return result;
        }, {});
    
        historicoDisciplinas.forEach((disciplina) => {
          if (disciplinasSalvas[disciplina.tipo]) {
            disciplinasSalvas[disciplina.tipo].push(disciplina);
          }
        });
    
        return disciplinasSalvas;
      }

    return [historicoDisciplinas, processaHistoricoDisciplinas, typeToTitle];
}