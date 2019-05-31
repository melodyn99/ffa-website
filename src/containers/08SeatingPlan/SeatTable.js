// Essential for all components
import React from 'react';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { SeatTableStyles } from '../../utils/01MaterialJsStyles/SeatTable'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';

// Children components
import Seat from "./Seat";

export const getColumnLetter = (n) => {
	let result = "";

	(function inner(n, letters) {
		if (n >= 26) {
			inner(Math.floor(n / 26), "_ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		}
		result += letters[n % 26];
	})(n, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

	return result;
}

class SeatTable extends React.Component {

	render() {
		const { row, column, plan, companies, view, nstudents } = this.props;
		const { student_per_table } = plan.seating_plan_type;

		return (
			<div
			// style={{
			// 	...styles.root,
			// 	gridTemplateColumns: `repeat(${nstudents}, auto)`,
			// }}
			>
				{
					(new Array(nstudents)).fill(null).map((_, index) => {
						return (
							<div key={index}
							// style={this.props.classes.child}
							>
								<Seat letter={getColumnLetter(index + (column * student_per_table))}
									view={view}
									companies={companies}
									row={row}
									plan={plan}
								/>
							</div>
						);
					})
				}
			</div>
		);
	}
}

const combinedStyles = combineStyles(CommonStyles, SeatTableStyles);

export default withTranslation()(connect(null, null)(withStyles(combinedStyles)(SeatTable)));
