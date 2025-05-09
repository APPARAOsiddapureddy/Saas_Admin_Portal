import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Container from '@material-ui/core/Container'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
// import NoData from '../svgIcons/NoData';
import mockInvoices from '../../mockData/invoices.json';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({
  table: {
    minWidth: 500,
  },
  tablecell: {
    fontSize: '16px'
  }
}));

const tableStyle = { width: 160, fontSize: 14, cursor: 'pointer', borderBottom: 'none', padding: '8px', textAlign: 'center' }
const headerStyle = { borderBottom: 'none', textAlign: 'center'}

const Invoices = () => {
  const history = useHistory()
  const rows = mockInvoices

  const toCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows.length);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`)
  }

  const openInvoice = (id) => {
    history.push(`/invoice/${id}`)
  }

  function checkStatus(status) {
    return status === "Partial" ? {border: 'solid 0px #1976d2', backgroundColor: '#baddff', padding: '8px 18px', borderRadius: '20px' }
        : status === "Paid" ? {border: 'solid 0px green', backgroundColor: '#a5ffcd', padding: '8px 18px', borderRadius: '20px' }
        : status === "Unpaid" ? {border: 'solid 0px red', backgroundColor: '#ffaa91', padding: '8px 18px', borderRadius: '20px' }
        : "red";
  }

  if(rows.length === 0) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
     
      <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No invoice yet. Click the plus icon to create invoice</p>
    </div>
  }
  
  return (
    <div>
      <Container style={{width: '85%', paddingTop: '70px', paddingBottom: '50px', border: 'none'}}>
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Number</TableCell>
                <TableCell style={headerStyle}>Client</TableCell>
                <TableCell style={headerStyle}>Amount</TableCell>
                <TableCell style={headerStyle}>Due Date</TableCell>
                <TableCell style={headerStyle}>Status</TableCell>
                <TableCell style={headerStyle}>Edit</TableCell>
                <TableCell style={headerStyle}>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id} style={{cursor: 'pointer'}}>
                  <TableCell style={tableStyle} onClick={() => openInvoice(row.id)}>{row.invoiceNumber}</TableCell>
                  <TableCell style={tableStyle} onClick={() => openInvoice(row.id)}>{row.client}</TableCell>
                  <TableCell style={tableStyle} onClick={() => openInvoice(row.id)}>${toCommas(row.total)}</TableCell>
                  <TableCell style={tableStyle} onClick={() => openInvoice(row.id)}>{moment(row.dueDate).fromNow()}</TableCell>
                  <TableCell style={tableStyle} onClick={() => openInvoice(row.id)}>
                    <button style={checkStatus(row.status)}>{row.status}</button>
                  </TableCell>
                  <TableCell style={{...tableStyle, width: '10px'}}>
                    <IconButton onClick={() => editInvoice(row.id)}>
                      <BorderColorIcon style={{width: '20px', height: '20px'}} />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{...tableStyle, width: '10px'}}>
                    <IconButton>
                      <DeleteOutlineRoundedIcon style={{width: '20px', height: '20px'}} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Invoices;