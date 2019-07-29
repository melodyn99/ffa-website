import React from 'react';
import { withTranslation } from 'react-i18next';

function ListType4(props) {
    return (

        <div className="ListType6">
            <div>
                <div className={"wrapper-message clearfix they"}>
                    <div>
                        <div className="name">彭</div>
                        <div className="nameLong">{props.name} [course from api] - {props.date}</div>
                        <div className="message">
                            <h4>title from API</h4>
                            <p>{props.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType4);