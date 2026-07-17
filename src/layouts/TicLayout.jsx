import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const TicLayout = ({ children, title }) => {
  return (
    <div className="cc-layout">
      <Sidebar />
      <div className="cc-main">
        <Navbar title={title} />
        <main className="cc-content">{children}</main>
      </div>
    </div>
  );
};

export default TicLayout;