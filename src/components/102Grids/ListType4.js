import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType4(props) {
    return (
        <div className="ListType4">
            <div className="wrapper-message left blue">
                <div className="name">
                    <div className="content">{props.name}</div>
                </div>
                <div className="message">
                    <div className="content">{props.content}</div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType4);