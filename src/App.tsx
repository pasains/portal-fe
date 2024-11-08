import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Inventory } from "./pages/inventory/inventory";
import { Borrowing } from "./pages/borrowing/borrowing";
import { InventoryGroup } from "./pages/inventoryGroup/inventoryGroup";
import { Borrower } from "./pages/borrower/borrower";
import { Organization } from "./pages/organization/organization";
import { InventoryType } from "./pages/inventoryType/inventoryType";
import { Profile } from "./pages/profile/profile";
import { InventoryDetail } from "./pages/inventory/inventoryDetail";
import { CreatedInventoryInput } from "./pages/inventory/createInventory";
import { CreatedBorrowingInput } from "./pages/borrowing/createBorrowing";
import { CreatedInventoryTypeInput } from "./pages/inventoryType/createInventoryType";
import { UpdatedInventoryInput } from "./pages/inventory/updateInventory";
import { UpdatedInventoryTypeInput } from "./pages/inventoryType/updateInventoryType";
import { UpdatedOrganization } from "./pages/organization/updateOrganization";
import { CreateInventoryGroup } from "./pages/inventoryGroup/createInventoryGroup";
import { UpdatedBorrower } from "./pages/borrower/updateBorrower";
import DeleteAlert from "./container/deleteAlert";
import { InventoryTypeDetail } from "./pages/inventoryType/inventoryTypeDetail";
import { InventoryGroupDetail } from "./pages/inventoryGroup/inventoryGroupDetail";
import { OrganizationDetail } from "./pages/organization/organizationDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory">
          <Route index={true} element={<Inventory />} />
        </Route>
        <Route path="/inventorytype/:id" element={<InventoryTypeDetail />} />
        <Route path="/inventorygroup/:id" element={<InventoryGroupDetail />} />
        <Route path="/organization/:id" element={<OrganizationDetail />} />
        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/inventorygroup" element={<InventoryGroup />} />
        <Route path="/borrower" element={<Borrower />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/inventorytype" element={<InventoryType />} />
        <Route path="/user/profile/:id" element={<Profile />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route path="/inventory/create" element={<CreatedInventoryInput />} />
        <Route path="/borrowing/create" element={<CreatedBorrowingInput />} />
        <Route
          path="/inventorytype/create"
          element={<CreatedInventoryTypeInput />}
        />
        <Route
          path="/inventorygroup/create"
          element={<CreateInventoryGroup />}
        />
        <Route
          path="/inventory/update/:id"
          element={<UpdatedInventoryInput />}
        />
        <Route
          path="/inventorytype/update/:id"
          element={<UpdatedInventoryTypeInput />}
        />
        <Route path="/borrower/update/:id" element={<UpdatedBorrower />} />
        <Route
          path="/organization/update/:id"
          element={<UpdatedOrganization />}
        />
        <Route path="/inventory/delete/:id" element={<DeleteAlert />} />
      </Routes>
    </div>
  );
}

export default App;
