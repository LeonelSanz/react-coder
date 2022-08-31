import './App.css';
import NavBar from './components/NavBar';

function App() {

  let desafio = "Ecommerce";

  return (
    <>
      <NavBar/>
      <div className="App">
        {/* Estilos en linea */}
        <p style={
          {
            color: "salmon",
            paddingTop: "10px",
          }
        }>
          Bienvenidos al {desafio}!
        </p>
        <input placeholder='Ingrese algun contenido'/>
      </div>
    </>
  );
}

export default App;
