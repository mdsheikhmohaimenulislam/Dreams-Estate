import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ToastContainer } from "react-toastify";
import ContextProvider from "./Context/ContextProvider/ContextProvider";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <ContextProvider>
        <RouterProvider router={router} />
          <Toaster position="top-right" />
        <ToastContainer />
      </ContextProvider>

    </QueryClientProvider>
  </StrictMode>
);
