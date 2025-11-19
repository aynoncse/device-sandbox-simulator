import MainContent from './Layout/MainContent';
import Sidebar from './Layout/Sidebar';

/**
 * The main application component.
 *
 * This component renders the sidebar and main content.
 */
function App() {

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
