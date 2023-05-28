import './App.css';
import Todo from './components/Todo/Todo';
import { Routes, Route } from 'react-router-dom';
import Uniq from './components/Uniq/Uniq';
import ErrorPages from './pages/ErrorPages/ErrorPages';

function App() {
  return (
    <div className="Todo">
      <Routes>
        <Route path="/">
          <Route index element={<Todo />} />
          <Route path=":id" element={<Uniq />} />
        </Route>
        <Route path="*" element={<ErrorPages />} />
      </Routes>
    </div>
  );
}

export default App;
