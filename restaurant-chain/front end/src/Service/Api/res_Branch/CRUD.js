import axios from "axios";

const url = "http://localhost:5001/";

export const getBranches = async () => {
 
  try {
    const result = await axios.get(`${url}branch`);
   
    if (!result?.data?.error) {
      return result?.data?.allBranches;
    }
  } catch (err) {
    console.error("ERROR ====> ", err);
    throw err.response.data.message;
  }
};

export const deleteMenuItem = async (payload) => {
 
 
  try {
    const result = await axios.delete(
      `${url}menu/${payload.menuId}`,
    );

    if (!result.data?.error) {
      const menu=await getMenu()

   
      return({
message:result.data?.message,
menu:menu
     } )
    }
  } catch (err) {
    console.error("ERROR ====> ", err.response.data.message);
    throw err.response.data.message;
  }
};

export const addMenuItem = async (payload) => {
console.log(payload);
  try {
    const result = await axios.post(`${url}menu`,{name:payload.item});

    if (!result.data?.error) {
      const menu=await getMenu()

   
      return({
message:result.data?.message,
menu:menu
     } )
        
    }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data.message);
    throw err.response.data.message;
  }
};
export const editItem= async (payload) => {


  try {
    const result = await axios.put(`${url}menu/${payload.menuId}`,{name:payload.content.trim()});

    if (!result.data?.error) {


      const menu=await getMenu()

   
      return({
message:result.data?.message,
menu:menu
     } )

    }
  } catch (err) {
    console.log("ERROR  from editing====> ", err);
   
    throw err.response.data.message;
  }
};
