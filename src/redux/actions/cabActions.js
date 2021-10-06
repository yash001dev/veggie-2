import axios from "axios";

export const bookCab = (cabData) => async (dispatch) => {
  try {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    await authAxios.post("/caborder", cabData);
  } catch (e) {}
};

export const cancelCabOrder = (id, status) => async (dispatch) => {
  try {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    await authAxios.post("/cab/neworders", {
      cab_order_id: id,
      cab_order_status: status,
    });
  } catch (e) {}
};
