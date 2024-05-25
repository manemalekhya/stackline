import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import {visuallyHidden} from "@mui/utils";

const headCells = [
    {
        id: 'weekEnding',
        numeric: false,
        disablePadding: false,
        label: 'WEEK ENDING'
    },
    {
        id: 'retailSales',
        numeric: true,
        disablePadding: false,
        label: 'RETAIL SALES'
    },
    {
        id: 'wholesaleSales',
        numeric: true,
        disablePadding: false,
        label: 'WHOLESALE SALES'
    },
    {
        id: 'unitsSold',
        numeric: true,
        disablePadding: false,
        label: 'UNITS SOLD'
    },
    {
        id: 'retailerMargin',
        numeric: true,
        disablePadding: false,
        label: 'RETAILER MARGIN'
    }
];

export default function DataTableHeader(props) {
    const {order,orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell)=> (
                    <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding='normal'
                    sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order ==='desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}