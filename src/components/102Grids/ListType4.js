import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType4(props) {
    return (
        <div className="ListType4">
            <div className="align-center">Today at 9:30AM</div>

            <div className="sep-10"></div>

            <div>
                <div className={"wrapper-message clearfix " + (props.from)}>
                    <div>
                        <div className={"name " + (props.same ? 'same' : '')}>{props.name}</div>
                        <div className={"message " + (props.same ? 'same' : '')}>{props.content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType4);