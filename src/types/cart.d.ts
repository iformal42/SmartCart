interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}
