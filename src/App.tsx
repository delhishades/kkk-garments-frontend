import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
