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
  
    function processaHistoricoDisciplinas(){
        const disciplinasSalvas = {        
            Espc: [],
            Espm: [],
            Espcom: [],
            Ope: [],
            Ob: [],
            Comp: []
        }
        
        historicoDisciplinas.map(({tipo, id}) => {
            disciplinasSalvas[tipo].push(id)
        })

        return disciplinasSalvas
    }

    return [historicoDisciplinas, processaHistoricoDisciplinas]
}