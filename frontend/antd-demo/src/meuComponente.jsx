export default function MeuComponente(props){ //props = {}
  const a = {} //chave -> valor
  a.teste = 'eu sou o teste'
  return(
    <div style={{height: 100, width: 100, backgroundColor: 'red'}}>
      <span>{props.name}</span>
      <span>{a.teste}</span>
      <button style={{width: 100, height: 20}} onClick={() => props.funcao('oiii')}> teste </button>
      {props.children}
    </div>
  )
}