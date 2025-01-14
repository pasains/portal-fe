import { Routes, Route, Navigate } from "react-router-dom";
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
import { UpdateInventoryGroup } from "./pages/inventoryGroup/updateInventoryGroup";
import { CreateBorrower } from "./pages/borrower/createBorrower";
import { CreateOrganization } from "./pages/organization/createOrganization";
import { UpdateBorrowing } from "./pages/borrowing/updateBorrowing";
import { LoginPage } from "./pages/login";
import ProtectedRoutes from "./middleware";
import { CreatePost } from "./pages/post/createPost";
import { PostList } from "./pages/post/postList";
import { UpdatePost } from "./pages/post/updatePost";

function App() {
  return (
    <div>
      <Routes>
        //login
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/update/:id" element={<UpdatePost />} />
        <Route path="/post" element={<PostList />} />
        <Route element={<ProtectedRoutes />}>
          //Home route
          <Route path="/home" element={<Home />} />
          //User route
          <Route path="/user/profile/:id" element={<Profile />} />
          //Inventory route
          <Route path="/inventory">
            <Route index={true} element={<Inventory />} />
            <Route path="/inventory/:id" element={<InventoryDetail />} />
            <Route
              path="/inventory/create"
              element={<CreatedInventoryInput />}
            />
            <Route
              path="/inventory/update/:id"
              element={<UpdatedInventoryInput />}
            />
            <Route path="/inventory/delete/:id" element={<DeleteAlert />} />
          </Route>
          //Inventory type route
          <Route path="/inventorytype">
            <Route index={true} element={<InventoryType />} />
            <Route
              path="/inventorytype/:id"
              element={<InventoryTypeDetail />}
            />
            <Route
              path="/inventorytype/create"
              element={<CreatedInventoryTypeInput />}
            />
            <Route
              path="/inventorytype/update/:id"
              element={<UpdatedInventoryTypeInput />}
            />
          </Route>
          //Inventory group route
          <Route path="/inventorygroup">
            <Route index={true} element={<InventoryGroup />} />
            <Route
              path="/inventorygroup/:id"
              element={<InventoryGroupDetail />}
            />
            <Route
              path="/inventorygroup/create"
              element={<CreateInventoryGroup />}
            />
            <Route
              path="/inventorygroup/update/:id"
              element={<UpdateInventoryGroup />}
            />
          </Route>
          //Borrowing route
          <Route path="/borrowing">
            <Route index={true} element={<Borrowing />} />
            <Route
              path="/borrowing/create"
              element={<CreatedBorrowingInput />}
            />
            <Route path="/borrowing/:id" element={<UpdateBorrowing />} />
          </Route>
          //Borrower route
          <Route path="/borrower">
            <Route index={true} element={<Borrower />} />
            <Route path="/borrower/update/:id" element={<UpdatedBorrower />} />
            <Route path="/borrower/create" element={<CreateBorrower />} />
          </Route>
          //Organization route
          <Route path="/organization">
            <Route index={true} element={<Organization />} />
            <Route path="/organization/:id" element={<OrganizationDetail />} />
            <Route
              path="/organization/create"
              element={<CreateOrganization />}
            />
            <Route
              path="/organization/update/:id"
              element={<UpdatedOrganization />}
            />
          </Route>
          // //
        </Route>
      </Routes>
    </div>
  );
}

export default App;
