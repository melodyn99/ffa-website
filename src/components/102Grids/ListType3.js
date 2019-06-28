import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';

function ListType3(props) {
    return (
        <div className="ListType3">

            <div className="LeftColumn">
                <img src={require('../../images/600-400.png')} alt="" />
            </div>

            <div className="RightColumn">
                <h4>{props.title}</h4>
                <h5>{props.date}</h5>
                <p>{props.content}<br />{props.content}<br />{props.content}</p>
            </div>
        </div>
    )
}

export default withTranslation()(ListType3);