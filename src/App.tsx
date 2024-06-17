import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <div className="bg-background-medium flex h-full w-full flex-col">
      <Header name="Jane"></Header>
      <div className="flex-grow">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}
