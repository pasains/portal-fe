import { Routes, Route } from "react-router-dom";
import { Inventory } from "./pages/inventory";
import { Home } from "./pages/home";
import { InventoryDetail } from "./pages/inventoryDetail";
import { CreateInventoryInput } from "./pages/createInventory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route
          path="/inventory/createinventory"
          element={<CreateInventoryInput />}
        />
      </Routes>
    </div>
  );
}

export default App;
