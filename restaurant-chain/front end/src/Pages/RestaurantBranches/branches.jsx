import React,{useState} from 'react'

import BranchesList from './branchList';
const Branches = () => {



  const [branches, setBranches] = useState([
    { id: 1, name: "Branch 1", createdAt: "2023-01-01", location: "Location 1" },
    { id: 2, name: "Branch 2", createdAt: "2023-02-01", location: "Location 2" },
    // Add more branches as needed
  ]);

  const handleDelete = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log('Edit branch with id:', id);
  };







  return (
    <div>
      <h1>Restaurant Chains</h1>
      <BranchesList branches={branches} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>

  )
}

export default Branches