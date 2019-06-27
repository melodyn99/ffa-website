import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType6(props) {
    return (
        <div className="ListType4">
            <div className="student-name">
                <div className="name">{props.studentName}</div>
           </div>
            <div className="wrapper-message left grey">
                <div className="name"></div>
                <div className="message">
                    <div className="content">{props.studentContent}</div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType6);