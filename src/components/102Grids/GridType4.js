import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function GridType4(props) {
    const {
        // t,
        i18n
    } = props;

    return (
        <div className="GridType4">
            <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_media.jpg')})` }}>
                <div className="text">
                    <h3>Why do we use it</h3>
                    <span className="date">30/11/2019</span><span className="source">Apple Daily</span>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...</p>

                    <Link to={"/" + i18n.language + "/media/" + props.id} className="button" alt="">Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(GridType4);
