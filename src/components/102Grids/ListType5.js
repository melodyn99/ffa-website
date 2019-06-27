import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType5(props) {
    return (
        <div>
            <div className="align-center">Today at 9:30AM</div>

            <div className="sep-10"></div>

            <div className="ListType5">
                <div className={"wrapper-message clearfix " + (props.role)}>
                    <div>
                        <div className={"name " + (props.same ? 'same' : '')}></div>
                        <div className={"nameLong " + (props.hide ? 'hide' : '')}> {props.name}</div>
                        <div className={"message " + (props.same ? 'same' : '')}>{props.content}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default withTranslation()(ListType5);