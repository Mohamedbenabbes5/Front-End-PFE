import React, { useState, useEffect } from "react";
import { mdiCheckCircle ,mdiAlert  } from '@mdi/js';
import axios from 'axios';

import Icon from '@mdi/react';
const Validation = ({ projectId }) => {
    const [canStart, setCanStart] = useState(null); // Utilisez null pour indiquer que la requête est en cours

    useEffect(() => {
        const checkResource = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.post('http://localhost:3000/project/can-start-prcessing', { projectId }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });  

                if (response.status === 200) {
                    setCanStart(true); // Si la requête réussit, mettez canStart à true
                }
            } catch (error) {
                console.log(error.response);
                setCanStart(false); // Si la requête échoue, mettez canStart à false
            }
        }

        checkResource();
    }, [projectId]);

    return (
        <div className="text-center">
            {canStart === null && <p>Loading...</p>}
            {canStart === true ? (
                <>
                    <Icon path={mdiCheckCircle }
                        title="User Profile"
                        size={4}
                        rotate={2}
                        color="green"
                    />
                    <div>
                        <h5>Processing allowed! Your submission is valid</h5>
                    </div>
                </>
            ) : canStart === false ? (
                <>
                    <Icon path={mdiAlert }
                        title="User Profile"
                        size={4}
                        color="#a20404"
                    />
                    <div>
                        <h5 style={{color:'#a71616c4'}}>Media missing! You must import media data for continues processing.</h5>
                    </div>
                </>
            ) : null}
        </div>
    );
};


export default Validation;
