import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Bmi from './pages/Bmi';
import IdealWeight from './pages/IdealWeight';
import DailyCalorie from './pages/DailyCalorie';
import FatBodyPercentage from './pages/FatBodyPercentage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' render={() => <Home />} />
            <Route path='/bmi' render={() => <Bmi />} />
            <Route path='/ideal-weight' element={IdealWeight} />
            <Route path='/daily-calorie' element={DailyCalorie} />
            <Route path='/fat-body-percentage' element={FatBodyPercentage} />
        </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
