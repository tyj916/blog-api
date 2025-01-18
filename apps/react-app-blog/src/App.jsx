import Header from './components/Header';
import Posts from './components/Posts';
import Footer from './components/Footer';
import './App.css'


function Main() {
  return (
    <main>
      <div className='container'>
        <Posts />
      </div>
    </main>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;