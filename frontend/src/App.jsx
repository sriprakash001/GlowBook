// import React from "react";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//     return <AppRoutes />;
// }

// export default App;

import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import "./styles/glowbook.css";

function App() {
    return (
        <>
            <Navbar />

            <AppRoutes />
        </>
    );
}

export default App;