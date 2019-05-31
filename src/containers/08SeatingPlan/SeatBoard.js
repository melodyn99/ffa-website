import React from 'react';
import { connect } from 'react-redux';

import { emitter, EventTypes } from '../../Util/EventEmitter'
import { SeatingPlan2PDF } from "./SeatingPlan2PDF";
import { getColumnLetter } from "./SeatTable";

import SeatTable from "./SeatTable";

// https://stackoverflow.com/a/9851769/5717561
const isFirefox = () => {
  return typeof InstallTrigger !== 'undefined';
}

const RowNumber = ({ row, view }) => (
  <div style={{
    placeSelf: "center",
    transform: `rotate(${view === "bottom" ? 180 : 0}deg)`
  }}>
    {(row + 1).toString()}
  </div>
);

const LetterCell = ({ value, number, view, column, student_per_table }) => (
  <div style={{
    display: 'flex',
  }}
  >
    {(new Array(number)).fill(null).map((item, index) => (
      <div style={{
        width: '100%',
        textAlign: 'center',
        placeSelf: 'center',
        transform: `rotate(${view === 'bottom' ? 180 : 0}deg)`,
      }}
      >
        {getColumnLetter(index + (column * student_per_table))}
      </div>
    ))}
  </div>
);

const styles = {
  root: {
    overflow: "auto",
    flex: "auto",
    userSelect: "none"
  },
  child: {
    display: "grid",
    transformOrigin: "left top",
  },
  grid: {
    display: "grid",
    alignContent: "center",
    gridGap: "5px 20px",
    width: "100%",
    padding: 20,
    margin: "auto",
    transformOrigin: "50% 50%",
    transition: "all 0.4s ease 0s",
  }
};

class SeatBoard extends React.Component {
  constructor(props) {
    super(props);
    this.root = React.createRef();
    this.grid = React.createRef();

    const { seating_plan_type } = this.props.plan;
    const { student_per_table, column } = seating_plan_type;

    const n = Math.floor(column / student_per_table);
    const rest = column % student_per_table;

    let tables = new Array(n > 0 && Number.isFinite(n) && n || 0).fill(student_per_table);
    rest > 0 && tables.push(rest);

    this.state = {
      tables,
      scale: 1.0
    };
  }

  componentDidMount() {
    if (!this.root.current) {
      return;
    }

    const widthRoot = Math.max(this.root.current.offsetWidth, 600);
    const widthGrid = this.grid.current.offsetWidth + 40;
    const newState = { gridWidth: widthGrid };

    // The scaling doesn't seem to be well supported by firefox
    if (!isFirefox() && widthGrid > widthRoot) {
      newState.scale = Math.max((widthRoot / widthGrid) || 1, 0.3);
    }
    this.setState(newState);

    emitter.addListener(EventTypes.PLAN2PDF, () => {
      const { seating_plan_type } = this.props.plan;
      const { student_per_table, column, row } = seating_plan_type;
      SeatingPlan2PDF({
        ...this.props,
        tables: this.state.tables,
        student_per_table,
        column,
        row
      });
    })
  }

  componentWillUnmount() {
    emitter.removeListener(EventTypes.PLAN2PDF);
  }

  renderLettersRow(view, column, student_per_table) {
    const { tables } = this.state;
    const blank = <LetterCell value={0} number={0} />;
    let letterNomer;

    return [blank, ...tables.map((item, index) => {
      const currentColumn = index % (tables.length + 2);
      if (letterNomer === undefined) {
        letterNomer = 0;
      } else {
        letterNomer += item;
      }

      return <LetterCell value={letterNomer} number={item} view={view} column={currentColumn} student_per_table={student_per_table} />;
    }), blank];
  }

  render() {
    const { companies, plan, view } = this.props;
    const { seating_plan_type } = plan;
    const { row, column } = seating_plan_type;
    const { scale, tables, gridWidth } = this.state;
    const { student_per_table } = plan.seating_plan_type;
    const lettersRow = this.renderLettersRow(view, column, student_per_table);

    const isScaled = scale !== 1;
    let current_row = 0;
    let parentStyleObject = {};
    let childStyleObject = styles.child;
    let gridStyleObject = {
      ...styles.grid,
      gridTemplateColumns: `40px repeat(${tables.length}, auto) 40px`,
      gridTemplateRows: `repeat(${row + 2}, 45px)`
    };
    if (view === 'bottom') {
      gridStyleObject.transform = 'rotate(180deg)';
    }
    if (isScaled) {
      childStyleObject = {
        ...styles.child,
        transform: `scale(${scale})`
      };
      let gridDom;
      if (gridDom = (this.grid && this.grid.current)) {
        parentStyleObject.width = gridWidth * scale;
        parentStyleObject.height = (gridDom.scrollHeight + 40) * scale;
        parentStyleObject.overflow = 'hidden';
      }
    }

    const seatPerRow = tables.length + 2;
    return tables && tables.length > 0 && (
      <div ref={this.root} style={styles.root}>
        <div style={parentStyleObject}>
          <div style={childStyleObject}>
            <div ref={this.grid} style={gridStyleObject}>
              {lettersRow}
              {
                (new Array((row || 0) * seatPerRow)).fill(null).map((_, index) => {
                  const indexString = index.toString();
                  const xPosition = index % seatPerRow;
                  if (xPosition === 0) {
                    current_row = row - (index / seatPerRow) - 1;
                    return <RowNumber key={indexString} row={current_row} view={view} />;
                  }
                  if (xPosition === seatPerRow - 1) {
                    return <RowNumber key={indexString} row={current_row} view={view} />;
                  }
                  const current_column = xPosition - 1;
                  return (
                    <SeatTable
                      key={indexString}
                      view={view}
                      row={current_row}
                      column={current_column}
                      nstudents={tables[current_column]}
                      plan={plan}
                      companies={companies}
                    />
                  );
                })
              }
              {lettersRow}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  viewingSeminar: state.seminarReducer.viewingSeminar,
  plan_seat: state.seatingPlanReducer.plan_seat,
  plan_id: state.seatingPlanReducer.plan_id,
});

export default connect(mapStateToProps)(SeatBoard);
