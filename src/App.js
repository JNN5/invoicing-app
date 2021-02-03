import Layout from "./components/Layout/Layout";

import { DataProvider } from "./api/DataContext";

function App() {
  return (
    <DataProvider storageKey="courses">
      <Layout />
    </DataProvider>
  );
}

export default App;
