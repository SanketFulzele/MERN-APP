import "./Navbar.css";
import { ShoppingCart } from "lucide-react";
import { useProductStore } from "../../../store/productStore";

const Navbar = () => {
  const cartItems = useProductStore((state) => state.cartItemCount);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ShopEase
      </div>

      <div className="cart-container">
        <ShoppingCart size={20} className="cart-icon" />

        <span className="cart-count">
          {cartItems}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;