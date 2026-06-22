import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StudentLayout = ({
  children
}) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        {children}
      </div>
    </div>
  );
};

export default StudentLayout;