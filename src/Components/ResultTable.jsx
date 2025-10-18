
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '../Context/ThemeContext';

const ResultTable = ({ data }) => {
    const { theme } = useTheme();

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: '35rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                backgroundColor: `${theme.background}CC`,
                backdropFilter: 'blur(8px)',
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {['WPM', 'Accuracy', 'Characters', 'Date'].map((head) => (
                            <TableCell
                                key={head}
                                align="center"
                                sx={{
                                    color: theme.title,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    backgroundColor: `${theme.background}DD`,
                                }}
                            >
                                {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:nth-of-type(even)': { backgroundColor: `${theme.background}33` }, // striped effect
                                '&:hover': { backgroundColor: `${theme.title}22`, cursor: 'pointer' }, // hover effect
                                transition: '0.3s',
                            }}
                        >
                            <TableCell align="center" sx={{ color: theme.title }}>
                                {row.wpm}
                            </TableCell>
                            <TableCell align="center" sx={{ color: theme.title }}>
                                {row.accuracy}%
                            </TableCell>
                            <TableCell align="center" sx={{ color: theme.title }}>
                                {row.characters}
                            </TableCell>
                            <TableCell align="center" sx={{ color: theme.title }}>
                                {row.timeStamp.toDate().toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResultTable;
