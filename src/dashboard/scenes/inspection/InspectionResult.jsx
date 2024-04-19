import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme, TextField, Typography } from "@mui/material";
import ProgressCircle from "../../components/ProgressCircle";

import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,

    randomTraderName,

    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import PieChartBox from '../pieChartBox/PieChartBox';


function Timestamp() {
    const randomDate = randomCreatedDate();
    return `${randomDate.getHours().toString().padStart(2, '0')}:${randomDate.getMinutes().toString().padStart(2, '0')}:${randomDate.getSeconds().toString().padStart(2, '0')}`;
}

const degre = ['Low', 'Medium', 'High'];
const type = ['crack', 'spall'];

const randomdegre = () => {
    return randomArrayItem(degre);
};
const randomDefect = () => {
    return randomArrayItem(type);
};


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const initialRows = [
        {
            id: 1,
            name: randomTraderName(),
            defecttype: randomDefect(),

            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17-06zYcwH20JlxqjCFH3pF8mRyzWPNngwg&usqp=CAU",
            videosource: 'video44.mp4',

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
        {
            id: 2,
            name: randomTraderName(),
            defecttype: randomDefect(),
            videosource: 'video44.mp4',
            image: "https://liftrightconcrete.com/wp-content/uploads/2016/12/concrete-cracks.jpg",

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
        {
            id: 3,
            image: "https://img.freepik.com/free-photo/fisured-concrete-texture_47618-78.jpg",
            videosource: 'video44.mp4',

            name: randomTraderName(),
            defecttype: randomDefect(),

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
        {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Wxf5hfW3z0GuLqRVm0DcYAv9JRgLsqpWWsTIK00I9_Nr8_8d3vWac7mBZj8ehITihIM&usqp=CAU",
            name: randomTraderName(),
            defecttype: randomDefect(),
            videosource: 'video44.mp4',

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
        {
            id: 5,
            image: "https://liftrightconcrete.com/wp-content/uploads/2016/12/concrete-cracks.jpg",

            name: randomTraderName(),
            defecttype: randomDefect(),
            videosource: 'video44.mp4',

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
        {
            id: 6,
            image: "https://www.turnbullmasonry.com/wp-content/uploads/2019/03/Garage-Floor-Cracks-%E2%80%93-What-Causes-Them.jpg",

            name: randomTraderName(),
            defecttype: randomDefect(),
            videosource: 'video44.mp4',

            timestamps: Timestamp(),
            DangerDegre: randomdegre(),
        },
    ];

    const columns = [
        { field: 'id', headerName: 'id', width: 80 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (<img src={params.value} alt="User" style={{ width: 200 }} />)
        }, {
            field: 'timestamps',
            headerName: 'Timestamps',
            type: 'Date',
            flex: 1,
            editable: true,
        },
        {
            headerName: 'Video Source',
            field: 'videosource',
            flex: 1,
            editable: true,
            renderCell: (params) => {
                const handleVideoClick = (event) => {
                    // Empêcher la propagation de l'événement pour éviter le déclenchement de l'édition de la ligne
                    event.stopPropagation();
                };

                return (
                    <a href={params.value} target="_blank" rel="noopener noreferrer" onClick={handleVideoClick}>
                        {params.value}
                    </a>
                );
            },
        },
        {
            field: 'defecttype',
            headerName: 'Defect type ',
            flex: 1,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['crack', 'spall',],

        },

        {
            field: 'DangerDegre',
            headerName: 'Danger Degre',
            flex: 1,
            editable: true,
            type: 'singleSelect',
            renderCell: (params) => {
                return (
                    <div className={`cellWithDangerDegre ${params.row.DangerDegre}`}>
                        {params.row.DangerDegre}
                    </div>
                );
            },
            valueOptions: ['Low', 'Medium', 'High'],
        },
        {
            field: 'comment',
            headerName: 'Comment',
            flex: 2,
            editable: true,

            renderEditCell: (params) => {
                return (
                    <TextField
                        multiline
                        fullWidth
                        value={params.value}
                        onChange={(event) => params.api.setEditCellValue({ id: params.id, field: 'comment', value: event.target.value })}
                    />
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            color="inherit"

                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    return (
        <Box m="20px">
            <Header
                title="Inspection Result"
                subtitle="List of domage result"
            />
            <div className="home">


                <div className="box box-1">
                    <PieChartBox charttype="type" />
                </div>
                <div className="box box-1">
                    <PieChartBox charttype="danger" />
                </div>
            </div>

            <Box
                m="20px 0 0 0"
                height="200vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        fontSize: "1rem", // Modifier la taille de la police ici
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontSize: "14px", // Augmenter la taille de police ici
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },

                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowHeight={150} // Modifier la taille des lignes selon vos besoins
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Box>
        </Box>
    );

}