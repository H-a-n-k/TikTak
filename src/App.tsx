import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import TaskPage from './pages/TaskPage';
import GlobalContextProvider from './contexts/GlobalContext';
import Layout1 from './layouts/layout1';
import CatePage from './pages/CatePage';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Layout1>
          <Routes>
            <Route path='/' element={<TaskPage />} />
            <Route path='/task' element={<TaskPage />} />
            <Route path='/cate' element={<CatePage />} />
            <Route path='/chart' element={<ChartPage />} />
          </Routes>
        </Layout1>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
