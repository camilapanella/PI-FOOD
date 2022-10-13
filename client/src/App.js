import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/home'
import Navbar from './components/Navbar/navbar'
import RecipeDetail from './components/RecipeDetail/recipeDetail'
import Form from './components/Form/form'
import LandingPage from './components/LandingPage/landingPage'

function App() {
  return (
    <>
        <Route path="/" component={Navbar}/> 
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/home/:id" component={RecipeDetail}/>
        <Route path="/create" component={Form}/>
    </>

  );
}

export default App;
