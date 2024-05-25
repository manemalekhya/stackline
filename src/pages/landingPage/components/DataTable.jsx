import React from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTableHeader from "./DataTableHeader";

function createData(id, weekEnding, retailSales, wholesaleSales, unitsSold, retailerMargin) {
    return {
        id,
        weekEnding,
        retailSales,
        wholesaleSales,
        unitsSold,
        retailerMargin
    };
}

function descendingComparator(a,b, orderBy) {
    if(b[orderBy] < a[orderBy]){
        return -1;
    }
    if(b[orderBy] > a[orderBy]){
        return 1;
    }
    return 0;
}

function getComparator(order,orderBy){
    return order === 'desc'
        ? (a,b) => descendingComparator(a, b, orderBy)
        : (a,b) => -descendingComparator(a, b, orderBy)
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

export default function DataTable(props) {
    const {data} = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('weekEndings');
    const [page, setPage] = React.useState(0);
    const[rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = data.sales;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const emptyRows = 
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        const visibleRows = React.useMemo(
            () =>
              stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              ),
            [order, orderBy, page, rowsPerPage],
          );


          return (
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                  >
                    <DataTableHeader
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {visibleRows.map((row) => {
                        return (
                          <TableRow hover key={row.id}>
                            <TableCell align="center">{row.weekEnding}</TableCell>
                            <TableCell align="center">{row.retailSales}</TableCell>
                            <TableCell align="center">{row.wholesaleSales}</TableCell>
                            <TableCell align="center">{row.unitsSold}</TableCell>
                            <TableCell align="center">{row.retailerMargin}</TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          );

}