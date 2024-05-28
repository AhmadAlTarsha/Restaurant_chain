import axios from "axios";

const url = "http://localhost:5001/";

export const addMaintenanceToBranch = async (payload) => {
console.log(payload.maintenanceData
);
  try {
    const result = await axios.post(`${url}branch_maintenance`, payload.maintenanceData);
console.log(result);
    if (!result.data?.error) {
 

      return {
        message: result.data?.message,
      
      };
    }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data);
    throw err.response.data.message;
  }
};
