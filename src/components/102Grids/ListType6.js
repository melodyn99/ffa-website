import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';

function ListType6(props) {
    return (
        <Grid container spacing={16} className="ListType6">
            <Grid item xs={1}>
                <Grid container spacing={16}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                    <div>
                        <div className="LeftColumn">
                            <h2>{props.null}</h2>
                        </div>
                    </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <div>
                    <div className="RightColumn">
                        <h1>{props.studentName}</h1>
                        <h2>{props.studentContent}</h2>
                    </div>
                </div>
            </Grid>
            <Grid item xs={8}></Grid>
        </Grid>
    )
}

export default withTranslation()(ListType6);