import React from "react";
import AppRouter from "./AppRouter";
import NavigationDrawer from "./components/NavigationDrawer";

function App() {
  return (
    <div>
      <NavigationDrawer />
      <AppRouter />
    </div>
  );
}

export default App;
