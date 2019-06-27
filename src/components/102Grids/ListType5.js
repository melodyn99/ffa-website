import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType5(props) {
    return (
        <div className="ListType4">
            <div className="wrapper-message right blue">
                <div className="message">
                    <div className="content">{props.content}</div>
                </div>
                <div className="name">
                    <div className="content">{props.name}</div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType5);