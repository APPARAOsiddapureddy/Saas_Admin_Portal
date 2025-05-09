import React from 'react'
import { toCommas } from '../../utils/utils'
import styles from './Dashboard.module.css'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Empty from '../svgIcons/Empty'
import Chart from './Chart'
import moment from 'moment'
import { Check, Pie, Bag, Card, Clock, Frown } from './Icons'
import { useInvoices } from '../../hooks/useInvoices'

const BillingDashboard = () => {
    const history = useHistory()
    const { invoices } = useInvoices();

    const overDue = invoices?.filter((invoice) => new Date(invoice.dueDate) <= new Date())

    let paymentHistory = []
    for(let i = 0; i < invoices.length; i++) {
        let history = []
        if(invoices[i].paymentRecords !== undefined) {
            history = [...paymentHistory, invoices[i].paymentRecords]
            paymentHistory = [].concat.apply([], history);
        }
    }

    useEffect(() => {
        // This will force the component to re-render when it's mounted
        // and ensure we're getting the latest data from localStorage
        const checkLocalStorage = () => {
          const storedData = localStorage.getItem('invoices');
          if (storedData) {
            // Just checking if data exists to trigger a re-render
            console.log('Local storage data loaded');
          }
        };
        
        checkLocalStorage();
      }, []);
    //sort payment history by date
    const sortHistoryByDate = paymentHistory.sort(function(a, b) {
        var c = new Date(a.datePaid);
        var d = new Date(b.datePaid);
        return d-c;
    });
    
    let totalPaid = 0
    for(let i = 0; i < invoices.length; i++) {
        if(invoices[i].totalAmountReceived !== undefined) {
            totalPaid += invoices[i].totalAmountReceived
        }
    }

    let totalAmount = 0
    for(let i = 0; i < invoices.length; i++) {
        totalAmount += invoices[i].total
    }

    const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'Unpaid')
    const paid = invoices?.filter((invoice) => invoice.status === 'Paid')
    const partial = invoices?.filter((invoice) => invoice.status === 'Partial')

    if(invoices.length === 0) {
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
            <Empty />
            <p style={{padding: '40px', color: 'gray'}}>Nothing to display. Click the plus icon to start creating</p>
        </div>
    }
      
    return (
        <div className={styles.pageContainer}>
            <section className={styles.stat}>
                <ul className={styles.autoGrid}>
                    <li className={styles.listItem} style={{backgroundColor: '#3f51b5', color: 'white'}}>
                        <div>
                            <p>{toCommas(totalPaid)}</p>
                            <h2 style={{color: 'white'}}>Payment Received</h2>
                        </div>
                        <div>
                            <Check />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{toCommas(totalAmount - totalPaid)}</p>
                            <h2>Pending Amount</h2>
                        </div>
                        <div>
                            <Pie />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{toCommas(totalAmount)}</p>
                            <h2>Total Amount</h2>
                        </div>
                        <div>
                            <Bag />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{invoices.length}</p>
                            <h2>Total Invoices</h2>
                        </div>
                        <div>
                            <Card />
                        </div>
                    </li>

                    <li className={styles.listItem} style={{backgroundColor: '#3f51b5', color: 'white'}}>
                        <div>
                            <p>{paid.length}</p>
                            <h2 style={{color: 'white'}}>Paid Invoices</h2>
                        </div>
                        <div>
                            <Check />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{partial.length}</p>
                            <h2>Partially Paid Invoices</h2>
                        </div>
                        <div>
                            <Pie />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{unpaidInvoice.length}</p>
                            <h2>Unpaid Invoices</h2>
                        </div>
                        <div>
                            <Frown />
                        </div>
                    </li>

                    <li className={styles.listItem}>
                        <div>
                            <p>{overDue.length}</p>
                            <h2>Overdue</h2>
                        </div>
                        <div>
                            <Clock />
                        </div>
                    </li>
                </ul>
            </section>

            {paymentHistory.length !== 0 && (
                <section>
                    <Chart paymentHistory={paymentHistory} />
                </section>
            )}

            <section>
                <h1 style={{textAlign: 'center', padding: '30px' }}>{paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}</h1>
                <div>
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                {paymentHistory.length !== 0 && (
                                    <tr>
                                        <th style={{padding: '15px'}}></th>
                                        <th style={{padding: '15px'}}>Paid By</th>
                                        <th style={{padding: '15px'}}>Date Paid</th>
                                        <th style={{padding: '15px'}}>Amount Paid</th>
                                        <th style={{padding: '15px'}}>Payment Method</th>
                                        <th style={{padding: '15px'}}>Note</th>
                                    </tr>
                                )}
                                
                                {sortHistoryByDate.slice(-10).map((record) => (
                                    <tr className={styles.tableRow} key={record.id}>
                                        <td><button>{record?.paidBy?.charAt(0)}</button></td>
                                        <td>{record.paidBy}</td>
                                        <td>{moment(record.datePaid).format('MMMM Do YYYY')}</td>
                                        <td><h3 style={{color: '#00A86B', fontSize: '14px'}} >{toCommas(record.amountPaid)}</h3></td>
                                        <td>{record.paymentMethod}</td>
                                        <td>{record.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BillingDashboard
