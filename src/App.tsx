import { Routes, Route } from "react-router-dom";
import { Inventory } from "./pages/inventory";
import { Home } from "./pages/home";
import { InventoryDetail } from "./pages/inventoryDetail";
import { CreateInventoryInput } from "./pages/createInventory";
import { UpdateInventoryInput } from "./pages/updateInventory";
import { InventoryType } from "./pages/inventoryType";
import { UpdateInventoryTypeInput } from "./pages/updateInventoryType";
import { CreateInventoryTypeInput } from "./pages/createInventoryType";
import DeleteAlert from "./container/deleteAlert";
import { Borrowing } from "./pages/borrowing";
import { Receiving } from "./pages/receiving";
import { CreateReceivingInput } from "./pages/createReceiving";
import { CreateBorrowingInput } from "./pages/createBorrowing";
import { Profile } from "./pages/profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/receiving" element={<Receiving />} />
        <Route path="/inventorytype" element={<InventoryType />} />
        <Route path="/user/profile/:id" element={<Profile />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route path="/inventory/create" element={<CreateInventoryInput />} />
        <Route
          path="/inventorytype/create"
          element={<CreateInventoryTypeInput />}
        />
        <Route path="/receiving/create" element={<CreateReceivingInput />} />
        <Route
          path="/inventory/update/:id"
          element={<UpdateInventoryInput />}
        />
        <Route
          path="/inventorytype/update/:id"
          element={<UpdateInventoryTypeInput />}
        />
        <Route path="/borrowing/create" element={<CreateBorrowingInput />} />
        <Route path="/inventory/delete/:id" element={<DeleteAlert />} />
      </Routes>
    </div>
  );
}

export default App;
