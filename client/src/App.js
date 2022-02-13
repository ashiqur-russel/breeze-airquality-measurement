import React from "react";
const LazyLoadedComponent = React.lazy(() => import("./component/Map"));

function MyApp() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Waiting...</div>}>
        <LazyLoadedComponent /> ̰
      </React.Suspense>

    </div>
  );
}

export default MyApp;
