import axios from "axios";

const url = "http://localhost:5001/";

export const addMenuToBranch = async (payload) => {

  try {
    const result = await axios.post(`${url}branch_menu`, payload.selectedMenuItems);

    if (!result.data?.error) {
    //   const branches = await getBranches();

      return {
        message: result.data?.message,
        // branches: branches,
      };
    }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data.message);
    throw err.response.data.message;
  }
};
