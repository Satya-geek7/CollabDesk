import { Outlet } from "react-router-dom";
import InboxSubSidebar from "./InboxSubSidebar";

export default function InboxLayout() {
  return (
    <>
      <div className="flex">
        <InboxSubSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
