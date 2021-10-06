import React from "react";

const ErrorBox = ({ msg }) => {
  return (
    <div
      style={{
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "#8FDDF8",
        marginBottom: "1rem",
        padding: ".5rem 1rem",
        borderRadius: ".5rem",
      }}
    >
      {msg ? msg : "Error"}
    </div>
  );
};

export default ErrorBox;
