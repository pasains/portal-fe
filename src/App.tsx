import { Routes, Route } from "react-router-dom";
import { Inventory } from "./pages/inventory";
import { Home } from "./pages/home";
import { InventoryDetail } from "./pages/inventoryDetail";
import { CreateInventoryInput } from "./pages/createInventory";
import { UpdateInventoryInput } from "./pages/updateInventory";
import { InventoryType } from "./pages/inventoryType";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventorytype" element={<InventoryType />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route
          path="/inventory/createinventory"
          element={<CreateInventoryInput />}
        />
        <Route
          path="/inventory/updateinventory/:id"
          element={<UpdateInventoryInput />}
        />
      </Routes>
    </div>
  );
}

export default App;
