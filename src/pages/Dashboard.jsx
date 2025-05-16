import { useState } from "react";
import LeadCommunicationHistory from "../Components/LeadHistory";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { mockLeads } from "../constasnt";

const LeadSelector = () => {
  const [selectedId, setSelectedId] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [resetExpand, setResetExpand] = useState(false);

  const handleChange = (event) => {
    const id = event.target.value;
    setSelectedId(id);
    const lead = mockLeads.find((l) => l.customer.id === id);
    if (lead) {
      setSelectedLead(lead);
      setResetExpand((prev) => !prev); 
    } 
  };

  return (
    <>
    <Box p={3} sx={{ width: "200px" }}>
      <FormControl fullWidth>
        <InputLabel>Select Customer</InputLabel>
        <Select value={selectedId} onChange={handleChange} label="Select Customer">
          {mockLeads.map((lead) => (
            <MenuItem key={lead.customer.id} value={lead.customer.id}>
              {lead.customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
          {selectedLead && <LeadCommunicationHistory selectedLead={selectedLead} resetExpand={resetExpand} />}
</>
  );
};

export default LeadSelector;