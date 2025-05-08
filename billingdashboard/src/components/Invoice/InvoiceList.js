import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInvoices } from '../../hooks/useInvoices';

const InvoicesList = () => {
  const { invoices, deleteInvoice } = useInvoices();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter invoices based on status
  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    return invoice.status.toLowerCase() === filter.toLowerCase();
  });

  // Sort invoices based on selected criteria
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'invoiceNumber':
        comparison = a.invoiceNumber.localeCompare(b.invoiceNumber);
        break;
      case 'client':
        comparison = a.client.localeCompare(b.client);
        break;
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'dueDate':
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;
      case 'total':
        comparison = a.total - b.total;
        break;
      default:
        comparison = new Date(a.date) - new Date(b.date);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handle deleting an invoice
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoice(id);
    }
  };

  // Styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const filterContainerStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const selectStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  };
  
  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };
  
  const buttonStyle = {
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
    borderRadius: '4px',
  };
  
  const actionButtonStyle = {
    padding: '5px 10px',
    margin: '0 3px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  };
  
  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#2196F3',
    color: 'white',
  };
  
  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#f44336',
    color: 'white',
  };
  
  const statusBadgeStyle = (status) => {
    const baseStyle = {
      padding: '5px 10px',
      borderRadius: '15px',
      display: 'inline-block',
      fontSize: '12px',
    };
    
    const colors = {
      'Paid': { backgroundColor: '#4CAF50', color: 'white' },
      'Partial': { backgroundColor: '#FF9800', color: 'white' },
      'Unpaid': { backgroundColor: '#f44336', color: 'white' },
    };
    
    return { ...baseStyle, ...colors[status] };
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Invoices</h1>
        <Link to="/invoice" style={buttonStyle}>Create Invoice</Link>
      </div>
      
      <div style={filterContainerStyle}>
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select 
            id="filter" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sortBy">Sort by: </label>
          <select 
            id="sortBy" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="date">Date</option>
            <option value="dueDate">Due Date</option>
            <option value="invoiceNumber">Invoice Number</option>
            <option value="client">Client</option>
            <option value="total">Amount</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sortOrder">Order: </label>
          <select 
            id="sortOrder" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={selectStyle}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
      
      {sortedInvoices.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} onClick={() => setSortBy('invoiceNumber')}>
                Invoice #
                {sortBy === 'invoiceNumber' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th style={thStyle} onClick={() => setSortBy('client')}>
                Client
                {sortBy === 'client' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th style={thStyle} onClick={() => setSortBy('date')}>
                Date
                {sortBy === 'date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th style={thStyle} onClick={() => setSortBy('dueDate')}>
                Due Date
                {sortBy === 'dueDate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th style={thStyle} onClick={() => setSortBy('total')}>
                Amount
                {sortBy === 'total' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td style={tdStyle}>{invoice.invoiceNumber}</td>
                <td style={tdStyle}>{invoice.client}</td>
                <td style={tdStyle}>{new Date(invoice.date).toLocaleDateString()}</td>
                <td style={tdStyle}>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td style={tdStyle}>${invoice.total.toLocaleString()}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(invoice.status)}>
                    {invoice.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(invoice.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p>No invoices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default InvoicesList;
