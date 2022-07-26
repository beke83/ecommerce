//get an instance of a stripe promise
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    //if stripe promise doesnt exist
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PULISHABLE_KEY);
    }

    return stripePromise;
}

export default getStripe;