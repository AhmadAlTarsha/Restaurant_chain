import axios from "axios";

const url = "http://localhost:5001/";

export const getBranches = async () => {
  try {
    const result = await axios.get(`${url}branch`);

    if (!result?.data?.error) {
      return result?.data?.branch;
    }
  } catch (err) {
    console.error("ERROR ====> ", err);
    throw err.response.data.message;
  }
};

export const deleteBranch = async (payload) => {
  try {
    const result = await axios.delete(`${url}branch/${payload.branchId}`);

    if (!result.data?.error) {
      const branches = await getBranches();

      return {
        message: result.data?.message,
        branches: branches,
      };
    }
  } catch (err) {
    console.error("ERROR ====> ", err.response.data.message);
    throw err.response.data.message;
  }
};

export const addBranch = async (payload) => {
  console.log(payload);
  try {
    const result = await axios.post(`${url}branch`, {
      name: payload.name,
      phone: payload.phone,
      street_name: payload.street_name,
    });

    if (!result.data?.error) {
      const branches = await getBranches();

      return {
        message: result.data?.message,
        branches: branches,
      };
    }
  } catch (err) {
    console.log("ERROR ====> ", err.response.data.message);
    throw err.response.data.message;
  }
};
export const editBranch = async (payload) => {
  console.log(payload.branchId);

  try {
    const result = await axios.put(`${url}branch/${payload.branchId}`, {
      name: payload.content.name.trim(),
      street_name: payload.content.street_name.trim(),
      phone: payload.content.phone.trim(),
    });

    if (!result.data?.error) {
      const branches = await getBranches();

      return {
        message: result.data?.message,
        branches: branches,
      };
    }
  } catch (err) {
    console.log("ERROR  from editing====> ", err);

    throw err.response.data.message;
  }
};


