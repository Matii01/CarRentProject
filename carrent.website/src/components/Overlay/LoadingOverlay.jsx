function LoadingOverlay({ hidden }) {
  return (
    <div
      hidden={hidden}
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        width: "100vw",
        height: "100vw",
        zIndex: "10000",
        backgroundColor: "lightgray",
        opacity: "0.4",
      }}
    ></div>
  );
}

export default LoadingOverlay;
