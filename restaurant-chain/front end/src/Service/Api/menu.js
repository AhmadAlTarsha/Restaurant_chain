import axios from "axios";

const url = "http://localhost:5001/";

export const getMenu = async () => {
 
  try {
    const result = await axios.get(`${url}menu`);
   
   
    if (!result?.data?.error) {
      return result?.data?.colors;
    }
  } catch (err) {
    console.error("ERROR ====> ", err);
    throw err.response.data.message;
  }
};

// export const deleteCarColor = async (payload) => {
  
 
//   try {
//     const result = await axios.delete(
//       `${url}car-colors/${payload.colorId}`,
//     );

//     if (!result.data?.error) {
//       const colors=await getCarColors()

   
//       return({
// message:result.data?.message,
// colors:colors
//      } )
//     }
//   } catch (err) {
//     console.error("ERROR ====> ", err.response.data.message);
//     throw err.response.data.message;
//   }
// };

// export const addCarColors = async (payload) => {

//   try {
//     const result = await axios.post(`${url}car-colors`,{color:payload.color});

//     if (!result.data?.error) {
//       const colors=await getCarColors()

   
//       return({
// message:result.data?.message,
// colors:colors
//      } )
        
//     }
//   } catch (err) {
//     console.log("ERROR ====> ", err.response.data.message);
//     throw err.response.data.message;
//   }
// };
// export const editCarColor= async (payload) => {


//   try {
//     const result = await axios.put(`${url}car-colors/${payload.colorId}`,{color:payload.content.trim()});

//     if (!result.data?.error) {


//       const colors=await getCarColors()

   
//       return({
// message:result.data?.message,
// colors:colors
//      } )

//     }
//   } catch (err) {
//     console.log("ERROR  from editing====> ", err);
   
//     throw err.response.data.message;
//   }
// };
