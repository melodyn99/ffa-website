import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';

function ListType3(props) {
    return (
        <Grid container spacing={16} className="ListType3">
            <Grid item xs={2}>
                <div>
                    <div className="LeftColumn">
                        <img src={require('../../images/600-400.png')} alt="" />
                    </div>
                </div>
            </Grid>
            <Grid item xs={10}>
                <div>
                    <div className="RightColumn">
                        <h4>{props.title}</h4>
                        <h5>{props.date}</h5>
                        <h6>{props.content}</h6>
                        <h6>{props.content}</h6>
                        <h6>{props.content}</h6>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withTranslation()(ListType3);