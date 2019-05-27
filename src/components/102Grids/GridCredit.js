import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function GridCredit(props) {
    // const {t, i18n} = props;
    return (
        <div className="GridCredit">
            <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_milestone2.jpg')})` }}></div>
            <div className="text">
                <h3>Cafe coupon A</h3>

                <div className="wrap">
                    <div>
                        <div><span>100</span><br />points</div>
                    </div>

                    <div className="align-right aligh-bottom">
                        <Link to="/" className="button" alt="">Details</Link>
                        <Link to="/" className="button" alt="">Redeem</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(GridCredit);
