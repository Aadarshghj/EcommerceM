import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId)
    const user = req.user; // ✅ fix

    const existingItem = user.cartItems.find(
    (item) => item.product.toString() === productId.toString() 
  
    );
console.log(existingItem)
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    await user.populate("cartItems.product");

    res.json(user.cartItems);
  } catch (error) {
    console.log("error in addToCart", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// export const removeAllFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const user = req.user;

//     if (productId) {
//       user.cartItems = user.cartItems.filter(
//         (item) => item.product.toString() !== productId // ✅ fix
//       );
//     } else {
//       user.cartItems = [];
//     }

//     await user.save();
//     res.json(user.cartItems);
//   } catch (error) {
//     console.log("error in removeAllFromCart", error.message);
//     res.status(500).json({ message: "server error", error: error.message });
//   }
// };
export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    user.cartItems = [];
    await user.save();
    res.json({ success: true, cartItems: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId // ✅ fix
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.product.toString() !== productId
        );
      } else {
        existingItem.quantity = quantity;
      }

      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log("error in updateQuantity", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIds = user.cartItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map((product) => {
      const item = user.cartItems.find(
        (cartItem) =>
          cartItem.product.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("error in getCartProducts", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
