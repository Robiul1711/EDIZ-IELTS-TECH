import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
<AuthProvider>
     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
     </GoogleOAuthProvider>
     </AuthProvider>
  </StrictMode>
);
