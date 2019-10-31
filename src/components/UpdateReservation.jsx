import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core'

const UpdateReservation = ({ classes }) => {

    const [formOpen, setFormOpen] = useState(false)

    const displayForm = () => {
        setFormOpen(true);
    }

    return (
        <>
            <TextField
                id="standard-basic"
                label="Request ID"
                margin="normal"
            />
            <Button>Delete</Button>
            <Button onClick={displayForm}>Edit</Button>
            {formOpen ? 
                <form>
                    <Typography>Info Info Info Info</Typography>
                </form> : null }
        </>
    )

}

export default UpdateReservation