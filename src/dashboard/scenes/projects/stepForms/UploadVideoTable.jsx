import React, { useState } from 'react';
import { Grid, Button, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

function DynamicTable({onUpdate}) {
    const [rows, setRows] = useState([{ id: 1, video: null, flightpath: null }]);

    const handleFileChange = (event, rowIndex, columnName) => {

        const updatedRows = [...rows];
        updatedRows[rowIndex][columnName] = event.target.files[0];
        setRows(updatedRows);
        onUpdate("videos_Fpath",rows,true);
    };

    const handleAddRow = () => {
        setRows([...rows, { id: rows.length + 1, video: null, flightpath: null }]);
    };

    const handleDeleteRow = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleDeleteAll = () => {
        setRows([{ id: 1, video: null, flightpath: null }]);
    };

    const columns = [
        { field: 'id', headerName: 'Num', width: 70 },
        {
            field: 'video',
            headerName: 'Video',
            flex: 1,
            renderCell: (params) => (
                <label>
                    <SlideshowOutlinedIcon fontSize="large" />
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, params.row.id - 1, 'video')}
                        style={{ display: 'none' }}
                        accept="video/*"
                    />
                    {params.row.video ? params.row.video.name : <span style={{ color: 'red' }}>No video chosen!</span>}
                </label>
            ),
        },
        {
            field: 'flightpath',
            headerName: 'Flightpath',
            flex: 1,
            renderCell: (params) => (
                <label>
                    <RouteOutlinedIcon fontSize="large" />
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, params.row.id - 1, 'flightpath')}
                        style={{ display: 'none' }}
                        accept=".txt"
                    />
                    {params.row.flightpath ? params.row.flightpath.name : <span style={{ color: 'red' }}>No flightpath file chosen!</span>}
                </label>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => (
                [
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ fontSize: '28px' }} />}
                        label="Delete"
                        onClick={handleDeleteRow(id)}
                        color="error"
                    />,
                ]
            ),
        },
    ];

    return (
        <div style={{ height: 'auto', width: '50%', margin: 'auto', overflow: 'auto' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" mt='75px'>  
                <Grid item xs={12}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        slots={{ footer: 'null' }}
                        sx={{
                            boxShadow: 10,
                            border: 4,
                            borderColor: '#3e4396',
                            color: '#3e4396',
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#3e4396",
                                color: "white",
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "#c3c6fd",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: "#c3c6fd",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontSize: "18px",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" onClick={handleAddRow}>
                            Add
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteAll}>
                            Delete All
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}

export default DynamicTable;
