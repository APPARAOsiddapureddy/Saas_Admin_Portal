
import { useEffect, useState } from 'react';
import mockInvoices from '../mockData/invoices.json';

const LOCAL_KEY = 'invoices';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load invoices from localStorage or use mock data
  useEffect(() => {
    const loadInvoices = () => {
      try {
        const stored = localStorage.getItem(LOCAL_KEY);
        if (stored) {
          setInvoices(JSON.parse(stored));
        } else {
          // Initialize with mock data if nothing in localStorage
          localStorage.setItem(LOCAL_KEY, JSON.stringify(mockInvoices));
          setInvoices(mockInvoices);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading invoices:', error);
        setInvoices(mockInvoices);
        setIsLoaded(true);
      }
    };

    loadInvoices();
  }, []);

  // Save invoices to localStorage
  const saveInvoices = (newInvoices) => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newInvoices));
      setInvoices(newInvoices);
      return true;
    } catch (error) {
      console.error('Error saving invoices:', error);
      return false;
    }
  };

  // Add a new invoice
  const addInvoice = (invoice) => {
    return new Promise((resolve) => {
      const updated = [...invoices, invoice];
      const success = saveInvoices(updated);
      resolve(success);
    });
  };

  // Update an existing invoice
  const updateInvoice = (id, updatedData) => {
    return new Promise((resolve) => {
      const updated = invoices.map((inv) => 
        inv.id === id ? { ...inv, ...updatedData } : inv
      );
      const success = saveInvoices(updated);
      resolve(success);
    });
  };

  // Delete an invoice
  const deleteInvoice = (id) => {
    return new Promise((resolve) => {
      const updated = invoices.filter((inv) => inv.id !== id);
      const success = saveInvoices(updated);
      resolve(success);
    });
  };

  // Record a payment for an invoice
  const recordPayment = (invoiceId, paymentData) => {
    return new Promise((resolve) => {
      const invoice = invoices.find(inv => inv.id === invoiceId);
      
      if (!invoice) {
        resolve(false);
        return;
      }
      
      const paymentId = `PR-${invoice.paymentRecords.length + 1}`.padStart(6, '0');
      const newPayment = {
        id: paymentId,
        ...paymentData
      };
      
      const newTotalReceived = invoice.totalAmountReceived + paymentData.amountPaid;
      let newStatus = 'Unpaid';
      
      if (newTotalReceived >= invoice.total) {
        newStatus = 'Paid';
      } else if (newTotalReceived > 0) {
        newStatus = 'Partial';
      }
      
      const updatedInvoice = {
        ...invoice,
        totalAmountReceived: newTotalReceived,
        status: newStatus,
        paymentRecords: [...invoice.paymentRecords, newPayment]
      };
      
      const success = updateInvoice(invoiceId, updatedInvoice);
      resolve(success);
    });
  };

  return {
    invoices,
    isLoaded,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    recordPayment
  };
};

export default useInvoices;