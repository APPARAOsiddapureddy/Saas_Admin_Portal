import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useInvoices } from '../../hooks/useInvoices'

const CreateInvoice = () => {
  const history = useHistory();
  const { addInvoice, invoices } = useInvoices();
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    client: '',
    date: new Date().toISOString().substr(0, 10),
    dueDate: '',
    total: 0,
    status: 'Unpaid',
    totalAmountReceived: 0,
    paymentRecords: []
  });

  // Set the invoice number when invoices data is loaded
  useEffect(() => {
    if (invoices.length > 0) {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: `INV-00${invoices.length + 1}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: 'INV-001'
      }));
    }
  }, [invoices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'total' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate a new ID
    const newInvoice = {
      ...formData,
      id: invoices.length > 0 ? Math.max(...invoices.map(inv => inv.id)) + 1 : 1,
      totalAmountReceived: 0,
      paymentRecords: []
    };
    
    // Add invoice and wait for localStorage to update
    await addInvoice(newInvoice);
    
    // Navigate to dashboard after storage is updated
    history.push('/');
  };

  return (
    <div className="create-invoice-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Create New Invoice</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Invoice Number:</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Client:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Total Amount:</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <button 
            type="submit" 
            style={{
              backgroundColor: '#3f51b5',
              border: 'none',
              color: 'white',
              padding: '10px 15px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Create Invoice
          </button>
          <button 
            type="button" 
            onClick={() => history.push('/billingdashboard')}
            style={{
              backgroundColor: '#ccc',
              border: 'none',
              color: 'black',
              padding: '10px 15px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
