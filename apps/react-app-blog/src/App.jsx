import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import './App.css'


function Main() {
  return (
    <main>
      <div className='container'>
        <PostList />
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