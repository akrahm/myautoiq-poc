import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import OfferCard from './OfferCard';
import '../App.css';

const formatDate = (iso) => new Date(iso).toLocaleString();

const LeadCommunicationHistory = ({ selectedLead, resetExpand }) => {
  const ITEMS_PER_BATCH = 5;
  const observerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [expandedIds, setExpandedIds] = useState([]);

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
    setExpandedIds([]);
  }, [selectedLead, resetExpand]);

  const handleToggle = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const lead = selectedLead;

  return (
    <Grid p={3} sx={8} justifyContent={'flex-end'}>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">{lead.customer.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {lead.customer.email} | {lead.customer.phone}
              </Typography>
              <Typography variant="body2">
                Dealer: <strong>{lead.dealer.name}</strong>
              </Typography>
              <Chip label={lead.dealStatus} color={lead.dealStatus === 'Sold' ? 'success' : 'warning'} size="small" sx={{ mt: 1 }} />
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {lead.lostToPickedDate && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display={'flex'} alignItems={'center'}>
                <Typography variant='h6'>Original</Typography>
                <div className='circle yellow'></div>
                </Box>
                <Typography variant="subtitle2">Lost Lead Picked Up</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Source: ${lead.dealer.name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Intersted in ${lead.dealer.interestedIn}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(lead.lostToPickedDate)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {lead.pickedToSoldDate && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display={'flex'} alignItems={'center'}>
                <Typography variant='h6'>Revival</Typography>
                <div className='circle green'></div>
                </Box>
                <Typography variant="subtitle2">Picked Lead Turned Sold</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Source: ${lead.dealer.name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Intersted in : ${lead.dealer.dealConfirmedIn}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(lead.pickedToSoldDate)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Communication Timeline
          </Typography>

          <Stepper orientation="vertical" nonLinear activeStep={-1}>
            {lead.communicationHistory.slice(0, visibleCount).map((entry) => (
              <Step key={entry.id}>
                <StepLabel
                  optional={
                    <Typography variant="caption">{formatDate(entry.timestamp)}</Typography>
                  }
                >
                  {entry.type.toUpperCase()}
                </StepLabel>
                <Accordion expanded={expandedIds.includes(entry.id)} onChange={() => handleToggle(entry.id)} sx={{ ml: 4, mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>View Communication</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <OfferCard
                        title="2024 Honda Accord EX"
                        subtitle="Lease or finance offer from Altoona Honda"
                        leasePrice="$459/Mo"
                        leaseTerm="36 Months"
                        dueAtSigning="$3,799"
                        aprRate="1.9%"
                        aprTerm="For 36 Months"
                        offerEndDate="01/02/2025"
                        disclaimers={[
                          "Offer valid for well-qualified buyers.",
                          "Taxes, fees, and license not included.",
                          "See dealer for full details.",
                        ]}
                        ctaButtons={[
                          { text: "See Inventory", href: "#" },
                          { text: "Apply Now", href: "#" },
                        ]}
                      />
                  </AccordionDetails>
                </Accordion>
              </Step>
            ))}
          </Stepper>
          <div ref={observerRef} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LeadCommunicationHistory;