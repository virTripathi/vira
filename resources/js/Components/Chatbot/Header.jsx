import CloseIcon from "../Icons/CloseIcon";

function Header({ onClick }) {
  return (
    <div className="chat-widget-header">
      {/* Decorative orb */}
      <span
        style={{
          position: "absolute",
          left: "1rem",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill="rgba(255,255,255,0.9)" />
          <circle cx="12" cy="12" r="4" fill="rgba(124,58,237,0.8)" />
        </svg>
      </span>

      <h4>VIRA</h4>

      <button
        onClick={onClick}
        aria-label="Close chat"
        style={{
          position: "absolute",
          right: "0.75rem",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
      >
        <CloseIcon className="h-4 w-4" color="white" />
      </button>
    </div>
  );
}

export default Header;
