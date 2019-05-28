import React, { Component } from 'react';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as InviteeActionCreators from '../actions/invitee';

class PageNotFound extends Component {

	render() {
		return (
			<div>
				<div className="wrapper-container-main">
					<div className="container-main">

						<h2 className="pageTitle">Page Not Found</h2>

						<div className="wrapper-content">

							<div className="content">
								Sorry!
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state) => (
// 	{
// 	}
// );

export default PageNotFound;
// connect(mapStateToProps)(Contact);
