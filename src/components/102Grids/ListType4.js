import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';

function ListType4(props) {
    return (
        <Grid container spacing={16} className="ListType4">
            <Grid item xs={1}>
                <Grid container spacing={16}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                    <div>
                        <div className="LeftColumn">
                            <h2>{props.name}</h2>
                        </div>
                    </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <div>
                    <div className="RightColumn">
                        <h2>{props.content}</h2>
                    </div>
                </div>
            </Grid>
            <Grid item xs={8}></Grid>
        </Grid>
    )
}

export default withTranslation()(ListType4);