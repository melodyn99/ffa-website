import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType4(props) {
    return (
        <div>
            <div className="align-center">Today at 9:30AM</div>

            <div className="sep-10"></div>

            <div className="ListType4">
                <div className={"wrapper-message clearfix " + (props.role)}>
                    <div>
                        <div className="name">{props.name}</div>
                        <div className="message">{props.content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType4);