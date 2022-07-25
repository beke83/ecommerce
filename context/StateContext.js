import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setqty] = useState(1);

    const onAdd =(product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        //this condition runs if we try to add an item that already exists in the cart
        if(checkProductInCart){
            const updatedCartItems = cartItem.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity 
                } 
            })
            setCartItems(updatedCartItems);
        }
        //if item is not in the cart the else statement runs
        else {
            product.quantity = quantity;  //if item not already in the cart update the product quantity
            
            //set cart items to an [] and then an object where we spread the new product
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    //increase quantity funct
    const incQty = () => {
        setqty((prevQty) => prevQty + 1)
    }

    //decrease quantity function
    const decQty = () => {
        setqty((prevQty) => {
           if(prevQty - 1 < 1) return 1;

           return prevQty - 1;
        })
    }

    //create context provider by specifying a return statement 
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
            }}
        >
            {children}
        </Context.Provider>
    )
}

// a special function to more easily grab the state
export const useStateContext = () => useContext(Context);