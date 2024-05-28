import axios from "axios";

const url = "http://localhost:5001/";

export const addOpiningHoursToBranch = async (payload) => {
console.log(payload.openingHours);
  try {
    const result = await axios.post(`${url}branch_opining`, payload.openingHours);
console.log(result);
    if (!result.data?.error) {
    //   const branches = await getBranches();

      return {
        message: result.data?.message,
        // branches: branches,
      };
    }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data);
    throw err.response.data.message;
  }
};
