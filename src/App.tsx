import { Routes, Route } from "react-router-dom";
import { Inventory } from "./pages/inventory";
import { Home } from "./pages/home";
import { InventoryDetail } from "./pages/inventoryDetail";
import { CreateInventoryInput } from "./pages/createInventory";
import { UpdateInventoryInput } from "./pages/updateInventory";
import { InventoryType } from "./pages/inventoryType";
import { UpdateInventoryTypeInput } from "./pages/updateInventoryType";
import { CreateInventoryTypeInput } from "./pages/createInventoryType";
import { CreateBorrowing } from "./pages/createBorrowing";
import DeleteAlert from "./container/deleteAlert";
import { Borrowing } from "./pages/borrowing";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/inventorytype" element={<InventoryType />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route path="/inventory/create" element={<CreateInventoryInput />} />
        <Route
          path="/inventory/update/:id"
          element={<UpdateInventoryInput />}
        />
        <Route
          path="/inventorytype/update/:id"
          element={<UpdateInventoryTypeInput />}
        />
        <Route
          path="/inventorytype/create"
          element={<CreateInventoryTypeInput />}
        />
        <Route path="/borrowing/create" element={<CreateBorrowing />} />
        <Route path="/inventory/delete/:id" element={<DeleteAlert />} />
      </Routes>
    </div>
  );
}

export default App;
