import Header from './Header';
import Canvas from '../components/Canvas';

const MainContent = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <main className="flex-1 flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Canvas />
    </main>
  );
};

export default MainContent;
