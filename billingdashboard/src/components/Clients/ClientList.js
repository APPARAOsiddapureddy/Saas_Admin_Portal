import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import useInvoices from '../../hooks/UseInvoices';

const ClientList = () => {
  const { invoices, isLoaded } = useInvoices();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // Create a summary of clients by aggregating invoice data
  const clientsMap = new Map();

  invoices.forEach((invoice) => {
    const { client, total, totalAmountReceived } = invoice;
    if (!clientsMap.has(client)) {
      clientsMap.set(client, {
        client,
        totalInvoiced: 0,
        totalPaid: 0,
        invoices: [],
      });
    }
    const clientData = clientsMap.get(client);
    clientData.totalInvoiced += total;
    clientData.totalPaid += totalAmountReceived;
    clientData.invoices.push(invoice);
  });

  const clients = Array.from(clientsMap.values());

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Clients
      </Typography>
      <Grid container spacing={3}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.client}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{client.client}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Invoices: {client.invoices.length}
                </Typography>
                <Typography variant="body2">
                  Total Invoiced: ${client.totalInvoiced.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Total Paid: ${client.totalPaid.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Status:{' '}
                  {client.totalPaid === 0
                    ? 'Unpaid'
                    : client.totalPaid >= client.totalInvoiced
                    ? 'Paid'
                    : 'Partial'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientList;
