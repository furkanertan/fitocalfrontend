import './App.css';
import Bmi from './pages/Bmi';
import IdealWeight from './pages/IdealWeight';
import DailyCalorie from './pages/DailyCalorie';
import FatBodyPercentage from './pages/FatBodyPercentage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/bmi' element={<Bmi/>} />
            <Route exact path='/ideal-weight' element={<IdealWeight/>} />
            <Route exact path='/daily-calorie' element={<DailyCalorie/>} />
            <Route exact path='/fat-body-percentage' element={<FatBodyPercentage/>} />
        </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
