import React from 'react';
import { mdiCheckCircle ,mdiAlert  } from '@mdi/js';

import Icon from '@mdi/react';
const Validation = ({ isFormValid }) => {


    return (
        <div className="text-center">
            {isFormValid? (<>  <Icon path={mdiCheckCircle }
                title="User Profile"
                size={4}
                rotate={2}
                color="green"

            />
                <div>
                    <h5>Processing allowed! Your submission is valid</h5>
                    <p className="text-muted">

                    </p>
                </div>
            </>) : (<>  <Icon path={mdiAlert }
                title="User Profile"
                size={4}
                color="#a20404"

            />
                <div>
                    <h5 style={{color:'#a71616c4'}}>Media missing! You must import media data for continues processing.</h5>
                
                </div>
            </>)}

        </div>
    );
};

export default Validation;
