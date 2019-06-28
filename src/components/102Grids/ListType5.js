import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType5(props) {


    return (
        (props.role === 'me') ?
            <div className="ListType5">
                <div className="align-center">Today at 9:30AM</div>

                <div className="sep-10"></div>

                <div>
                    <div className={"wrapper-message clearfix " + (props.from)}>
                        <div>
                            <div className="name">{props.name}</div>
                            <div className="message">{props.content}</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="ListType5">
                <div className="align-center">Today at 9:30AM</div>

                <div className="sep-10"></div>

                <div>
                    <div className={"wrapper-message clearfix " + (props.from)}>
                        <div>
                            <div className="name"></div>
                            <div className="nameLong">{props.name}</div>
                            <div className="message">{props.content}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default withTranslation()(ListType5);