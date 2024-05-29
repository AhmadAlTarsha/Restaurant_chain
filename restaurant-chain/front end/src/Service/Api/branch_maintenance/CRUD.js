import axios from "axios";

const url = "http://localhost:5001/";

export const getMaintenanceBranch = async () => {
 
    try {
      const result = await axios.get(`${url}branch_maintenance`);
     

      
      if (!result?.data?.error) {
        return result?.data?.MaintenanceBranch;
      }
    } catch (err) {
      console.error("ERROR ====> ", err);
      throw err.response.data.message;
    }
  };

export const addMaintenanceToBranch = async (payload) => {
console.log(payload.maintenanceData
);
  try {
    const result = await axios.post(`${url}branch_maintenance`, payload.maintenanceData);
console.log(result);
if (!result.data?.error) {
    const maintenance=await getMaintenanceBranch()

 
    return({
message:result.data?.message,
maintenance:maintenance
   } )
  }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data);
    throw err.response.data.message;
  }
};
