import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

//create the context
const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);

    let foundProduct;
    let index; // index of the property to be updated

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        //this condition runs if we try to add an item that already exists in the cart
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        }
        //if item is not in the cart
        else {
            product.quantity = quantity;  //if item not already in the cart update the product quantity

            //set cart items to an [] and then an object where we spread the new product
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    //implement onRemove functionality
    const onRemove = (product) => {
        //know which product we are updating(removing)
        foundProduct = cartItems.find((item) => item._id === product._id);

         //filter the cartItems to include all of the item, 
        //but dont include the one that is the index we are looking for
        const newCartItems = cartItems.filter((item) => item._id !== product._id) ;

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);

        setCartItems(newCartItems);
    }

    // implemting quantity of items in the cart
    const toggleCartItemQuantity = (id, value) => {
        //find the item   
        foundProduct = cartItems.find((item) => item._id === id);
        console.log(foundProduct);
        //find the index of the items in the items cart array you want to update
        index = cartItems.findIndex((product) => product._id === id);

        //filter the cartItems to include all of the item, 
        //but dont include the one that is the index we are looking for
        const newCartItems = cartItems.filter((item) => item._id !== id) 
        console.log(newCartItems);
        
        if (value === 'inc') {

            setCartItems([{ ...foundProduct, quantity: foundProduct.quantity + 1 }, ...newCartItems]);
            // creates a new instance of the cartItems by spreading the cart items
            // then add the new product and spread all the ppties of the object
            // then update the quantity of the object. 

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);

        } else if (value === 'dec') {

            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            // creates a new instance of the cartItems by spreading the cart items
            // then add the new product and spread all the ppties of the object
            // then update the quantity of the object. 

            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    //increase quantity funct
    const incQty = () => {
        setqty((prevQty) => prevQty + 1)
    }

    //decrease quantity function
    const decQty = () => {
        setqty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        })
    }

    //create context provider by specifying a return statement 
    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

// a special function to more easily grab the state
export const useStateContext = () => useContext(Context);