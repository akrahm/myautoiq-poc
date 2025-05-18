import { useState } from "react";
import LeadCommunicationHistory from "../Components/LeadHistory";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { mockLeads } from "../constant";

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
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
    } 
  };

  return (
    <>
    <Grid container spacing={2} position={'relative'}>
    <Grid sx={3} minWidth={"250px"} position={'fixed'} top={'15%'}>
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

    </Grid>
          <Grid pl={40}>{selectedLead && <LeadCommunicationHistory selectedLead={selectedLead} resetExpand={resetExpand} />}
          </Grid>
          </Grid>
</>
  );
};

export default LeadSelector;