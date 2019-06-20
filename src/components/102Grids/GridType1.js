import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';

function GridType1(props) {
    return (
        <Grid container spacing={16} alignItems="center">
            <Grid item xs={4}>
                <div className="ListType1">
                    <div className="LeftColumn">
                        <h4> {props.name} </h4>
                        <h5> {props.location} </h5>
                    </div>
                </div>
            </Grid>
            <Grid item xs={8}>
                <div className="ListType2">
                    <div className="RightColumn">
                        <h4>{props.date}</h4>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withTranslation()(GridType1);