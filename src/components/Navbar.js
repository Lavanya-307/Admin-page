function Navbar() {
  return (
    <nav className="navbar bg-white border-bottom p-3">
      <div className="container-fluid justify-content-center">
        <div className="input-group" style={{ maxWidth: "500px" }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for rooms"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;