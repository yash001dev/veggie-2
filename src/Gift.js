import axios from "axios";
export const checkBasketGift = (grandtotal,setBasket) => {
  
  const authAxios = axios.create({
    baseURL: "https://admin.veggi365.com/api",
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("userToken")
      )}`,
    },
  });
  const fetchProducts = async () => {
    const { data } = await authAxios.get("/order/basket");
    data.forEach((basket) => {
      if(grandtotal >= 99 && grandtotal <= 299){
        if(basket['b1'] !== 1){
          setBasket('b1');
          return;
        }
      }
      if(grandtotal >= 299 && grandtotal <= 459){
        if(basket['b2'] !== 1){
          setBasket('b2');
          return;
        }
        if(basket['b1'] !== 1){
          setBasket('b1');
          return;
        }
      }
      if(grandtotal >= 459){
        if(basket['b3'] !== 1){
          setBasket('b3');
          return;
        }
        if(basket['b2'] !== 1){
          setBasket('b2');
          return;
        }
        if(basket['b1'] !== 1){
          setBasket('b1');
          return;
        }
      }
      else{
        setBasket(undefined);
        
      }
  });
    
  };
  fetchProducts();
    
  }