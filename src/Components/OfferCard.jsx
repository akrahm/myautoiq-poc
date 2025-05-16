import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
} from "@mui/material";

const OfferCard = ({
  title,
  subtitle,
  leasePrice,
  leaseTerm,
  dueAtSigning,
  aprRate,
  aprTerm,
  offerEndDate,
  disclaimers,
  ctaButtons,
}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Lease
            </Typography>
            <Typography variant="h5">{leasePrice}</Typography>
            <Typography variant="body2" color="text.secondary">
              {leaseTerm}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dueAtSigning} due at signing
            </Typography>
          </Grid>

          {aprRate && aprTerm && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Finance
              </Typography>
              <Typography variant="h5">{aprRate} APR</Typography>
              <Typography variant="body2" color="text.secondary">
                {aprTerm}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="caption" color="text.secondary">
          Offer ends: {offerEndDate}
        </Typography>

        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
          {ctaButtons.map((btn, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              href={btn.href}
              size="small"
            >
              {btn.text}
            </Button>
          ))}
        </Box>

        <Box mt={3}>
          <List dense>
            {disclaimers.map((text, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="caption" color="text.secondary">
                   {text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
