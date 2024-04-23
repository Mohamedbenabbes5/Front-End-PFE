import React, { useState, useEffect } from "react";
import {
    Col,
    Form,
    Input,
    Label,
    Row,

} from "reactstrap";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const ProjectForm = ({ onUpdate }) => {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ]
    const [formData, setFormData] = useState({
        id: null,
        name: null,
        description: null,
        startdate: null,
        endate: null,
        guests: null
    });

    const handleChangeInputForm = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    };
    useEffect(() => {
        // Génération d'un entier aléatoire sur 32 bits pour id lors du premier rendu
        const randomId = Math.round(Math.random() * Math.pow(2, 32));
        setFormData({ ...formData, id: randomId });
    }, []);

    useEffect(() => {
        // Appeler onUpdate chaque fois que formData change
        onUpdate(formData);
    }, [formData]); // Ajoutez formData comme dépendance

    return (
        <Form >
            <Row>
                <Col lg="12"

                >
                    <div className="mb-3">
                        <Label >
                            Project Name
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            required
                            className="form-control"
                            id="basicpill-firstname-input1"
                            placeholder="eg. Tacoma Narrows Bridge"
                            onChange={handleChangeInputForm}

                        />
                    </div>
                </Col>


            </Row>
            <Row>
                <Col lg="6">
                    <div className="mb-3">
                        <Label >
                            Start Date
                        </Label>
                        <Input
                            name="startdate"
                            onChange={handleChangeInputForm}

                            type="date"
                            required
                            className="form-control"
                            id="basicpill-firstname-input1"
                        />
                    </div>
                </Col>
                <Col lg="6">
                    <div className="mb-3">
                        <Label >
                            End Date
                        </Label>
                        <Input
                            name="enddate"
                            onChange={handleChangeInputForm}

                            type="date"
                            required
                            className="form-control"
                            id="basicpill-firstname-input1"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <div className="mb-3 mt-3">

                        <Label >
                            shared with
                        </Label>
                        <Autocomplete
                            className="custom-autocomplete"

                            multiple
                            id="tags-outlined"

                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            defaultValue={[top100Films[3]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="add guests"
                                />
                            )}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <div className="mb-3">
                        <Label htmlFor="basicpill-address-input1">
                            Description
                        </Label>
                        <textarea
                            name="description"
                            onChange={handleChangeInputForm}
                            id="basicpill-address-input1"
                            className="form-control"
                            rows="2"
                            placeholder="Enter Your description ..."

                        />
                    </div>
                </Col>
            </Row>
        </Form >
    )
}
export default ProjectForm;
