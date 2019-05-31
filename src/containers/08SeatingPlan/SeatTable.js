import React from 'react';

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

const styles = {
  root: {
    display: "grid",
    height: "100%",
    border: "0.7px black solid",
    textAlign: "center"
  },
  child: {
    width: "100%",
    height: "100%",
    border: "0.7px black solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
    maxWidth: "100%"
  }
};

export default class SeatTable extends React.Component {
  render() {
    const { row, column, plan, companies, view, nstudents } = this.props;
    const { student_per_table } = plan.seating_plan_type;

    return (
      <div style={{
        ...styles.root,
        gridTemplateColumns: `repeat(${nstudents}, auto)`,
      }}>
        {
          (new Array(nstudents)).fill(null).map((_, index) => {
            return (
              <div key={index.toString()}
                   style={styles.child}>
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
