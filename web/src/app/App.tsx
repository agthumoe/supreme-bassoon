import { MantineProvider, Title } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <header>
          <Title>Welcome to React Router!</Title>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </MantineProvider>
  );
}

export default App;
