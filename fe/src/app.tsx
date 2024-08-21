import { useState } from "react";
import { Header } from "./components/header";
import { List } from "./components/list";
import { Nav } from "./components/nav";

export function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Nav filter={filter} setFilter={setFilter} />
      <List filter={filter} />
    </div>
  );
}
