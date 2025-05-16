import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OfferCard from './OfferCard';

const generateMockData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `comm-${i + 1}`,
    type: i % 2 === 0 ? 'email' : 'call',
    timestamp: `2025-01-${(i % 30 + 1).toString().padStart(2, '0')}T10:00:00Z`,
    content: `This is a sample ${i % 2 === 0 ? 'email' : 'call'} communication #${i + 1}.`,
  }));
};

const mockLeads = [
  {
    customer: {
      id: 'cust-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-1234',
    },
    dealer: {
      id: 'dealer-001',
      name: 'Altoona Honda',
    },
    dealStatus: 'Sold',
    communicationHistory: generateMockData(100),
  },
  {
    customer: {
      id: 'cust-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '555-5678',
    },
    dealer: {
      id: 'dealer-002',
      name: 'Chapman Honda',
    },
    dealStatus: 'In Progress',
    communicationHistory: generateMockData(40),
  },
  {
    customer: {
      id: 'cust-003',
      name: 'Mark Johnson',
      email: 'mark.j@example.com',
      phone: '555-8765',
    },
    dealer: {
      id: 'dealer-003',
      name: 'Precision Toyota',
    },
    dealStatus: 'Sold',
    communicationHistory: generateMockData(60),
  },
];

const formatDate = (iso) => new Date(iso).toLocaleString();

const EmailContent = ({ content }) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      Email Discussion
    </Typography>
    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
      {content}
    </Typography>
  </Box>
);

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
    <Box p={3}>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">{lead.customer.name}</Typography>
          <Typography color="text.secondary">
            {lead.customer.email} | {lead.customer.phone}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Dealer: <strong>{lead.dealer.name}</strong>
          </Typography>
          <Chip label={lead.dealStatus} color={lead.dealStatus === 'Sold' ? 'success' : 'warning'} sx={{ mt: 1 }} />

          <Divider sx={{ my: 2 }} />
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
    </Box>
  );
};

export default LeadCommunicationHistory;