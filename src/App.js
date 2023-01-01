import './App.css';
import Bmi from './pages/Bmi';
import IdealWeight from './pages/IdealWeight';
import DailyCalorie from './pages/DailyCalorie';
import BodyFatPercentage from './pages/BodyFatPercentage';
import RecommendedExercises from './pages/RecommendedExercises';
import GenerateBodyReport from './pages/GenerateBodyReport';
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
            <Route exact path='/body-fat-percentage' element={<BodyFatPercentage/>} />
            <Route exact path='/recommended-exercises' element={<RecommendedExercises/>} />
            <Route exact path='/generate-body-report' element={<GenerateBodyReport/>} />
        </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
