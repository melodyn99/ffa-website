// Essential for all components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styling
import { IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';

// Api
import { apiConferences } from '../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import moment from 'moment';
import { forEach, toNumber } from 'lodash-es';

const config = {
    months: moment.months('zh-CN'),
    month_subs: moment.monthsShort('zh-CN'),
    weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    week_subs: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    today() {
        return new Date();
    },
};
const TODAY = config.today();

class Calendar extends Component {
    constructor(props) {
        super(props);

        let now = config.today();
        if (this.props.startDate) {
            now = moment.unix(this.props.startDate).toDate();
        }
        this.state = {
            daysHaveSeminar: [],
            current: now,
            selected: now,
            ldom: 30,
        };
    }

    componentDidMount() {
        const retrieve = this.retrieveMilestone();
        this.setState({
            ...this.state,
            current: retrieve ? new Date(retrieve) : this.state.current,
        }
            , () => {
                this.updateMonth(false, 0, this.state.current);
            }
        )
    }

    onClickMonth(current) {
        const { onChoseMonth } = this.props;
        onChoseMonth(current);
    }

    retrieveMilestone() {
        return typeof (Storage) !== "undefined" && window.sessionStorage.calendarMilestone
            ? JSON.parse(window.sessionStorage.calendarMilestone)
            : null
    }

    setMilestone(milestone) {
        if (typeof (Storage) !== "undefined") {
            window.sessionStorage.calendarMilestone = JSON.stringify(milestone);
        }
    }

    updateMonth(onload, add, initial) {
        const { current } = this.state;
        const { onDatePicked } = this.props;
        const d = initial || (add === 0 ? config.today() : current);
        d.setMonth(d.getMonth() + add);

        onDatePicked(moment(d).unix());

        const eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();

        this._getConferenceList(d);

        if (onload) {
            // console.log('onload', onload)
            setTimeout(() => this.onClickMonth(d), 500)
        }
        this.setState({
            ...this.state,
            current: d,
            ldom: eom,
        });
    }

    _getConferenceList = (d) => {
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        const firstDayTimestamp = moment(firstDay).valueOf();
        const lastDayTimestamp = moment(lastDay).valueOf();

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const daysHaveSeminar = [];
            forEach(obj.body, (item) => {
                forEach(item.conference_sections, i => {
                    if (i.start_date >= firstDayTimestamp && i.start_date <= lastDayTimestamp) {
                        daysHaveSeminar.push(toNumber(moment.unix(i.start_date / 1000).format('DD')));
                    }
                })
            });
            this.setState({
                ...this.state,
                daysHaveSeminar
            });

        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = {
            take_place_from: firstDayTimestamp,
            take_place_to: lastDayTimestamp,
        };

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);
    }

    prev() {
        this.updateMonth(true, -1);
    }

    next() {
        this.updateMonth(true, 1);
    }

    _onDatePicked(month, day) {
        const { current } = this.state;
        const d = new Date(current.getTime());
        d.setMonth(d.getMonth() + month);
        d.setDate(day);
        this.props.onDatePicked(moment(d).unix());
        this.setState({
            ...this.state,
            selected: d,
        });
    }

    refreshToday() {
        this.updateMonth(false, 0);
        this.setState({
            ...this.state,
            selected: config.today(),
        });
    }

    renderDay(opts = {}) {
        let key = opts.key;
        let baseClasses = 'day noselect';
        let today = '';
        let todayStyle = {};
        let containerStyle = {};
        if (opts.today) {
            today = 'current';
            todayStyle = {
                backgroundColor: '#d4d4d4',
            };
        }

        let selected = '';
        let selectedStyle = {};
        if (opts.selected) {
            selected = 'selected';
            selectedStyle = {
                border: '2px solid',
                borderColor: this.props.accentColor,
                color: '#fff',
            };
            containerStyle = {
                color: '#ffffff',
            };
        }

        const haveSeminarStyle = {
            width: '8px', height: '8px', backgroundColor: 'green', visilibity: 'hidden', borderRadius: '200px',
        };

        const divBlank = {
            width: '4px', height: '4px',
        };

        baseClasses += opts.current ? '' : ' non-current';

        const { daysHaveSeminar } = this.state;

        const dotVisible = daysHaveSeminar.includes(opts.date.getDate());
        if (dotVisible) {
            haveSeminarStyle.visilibity = 'visible';
        }

        return (
            <div
                key={key}
                className={baseClasses}
                style={containerStyle}
            >
                {/* Check if the date cell has */}
                {<div style={dotVisible ? haveSeminarStyle : divBlank} />}

                <div className={today} style={todayStyle} />
                <div className={selected} style={selectedStyle} />
                <p onClick={(ev) => {
                    const day = ev.target.innerHTML;
                    this._onDatePicked(opts.month, day);
                }}
                >{opts.date.getDate()}
                </p>
            </div>
        );
    }

    renderDays(copy) {
        const days = [];

        // set to beginning of month
        copy.setDate(1);

        // if we are missing no offset, include the previous week
        const offset = copy.getDay() === 0 ? 7 : copy.getDay();

        copy.setDate(-offset);

        let inMonth = false;
        let lastMonth = true;
        for (let i = 0; i < 42; i++) {
            // increase date
            copy.setDate(copy.getDate() + 1);

            // make sure we pass any previous month values
            if (i < 30 && copy.getDate() === 1) {
                inMonth = true;
                lastMonth = false;
            }
            // if we are seeing the '1' again, we have iterated over
            // the current month
            else if (i > 30 && copy.getDate() === 1) {
                inMonth = false;
            }

            const sel = new Date(this.state.selected.getTime());
            const isSelected = (sel.getFullYear() === copy.getFullYear()
                && sel.getDate() === copy.getDate()
                && sel.getMonth() === copy.getMonth());

            const isToday = (TODAY.getFullYear() === copy.getFullYear()
                && TODAY.getDate() === copy.getDate()
                && TODAY.getMonth() === copy.getMonth());

            days.push(this.renderDay({
                key: i,
                today: isToday,
                selected: isSelected,
                current: inMonth,
                month: (inMonth ? 0 : (lastMonth ? -1 : 1)),
                date: copy,
            }));
        }

        return days;
    }

    renderHeaders() {
        const header = [];

        for (let i = 0; i < config.week_subs.length; i++) {
            header.push(<p className="day-headers noselect" key={i}>
                {config.week_subs[i]}
            </p>,
            );
        }

        return header;
    }

    render() {
        // get su-sat header
        const header = this.renderHeaders();

        this.setMilestone(this.state.current);

        // copy our current time state
        const copy = new Date(this.state.current.getTime());

        // get the month days
        const days = this.renderDays(copy);

        const tMonth = config.months[this.state.selected.getMonth()];
        const tDate = this.state.selected.getDate();
        const month = config.months[this.state.current.getMonth()];
        const currentMonth = this.state.current.getMonth();
        const year = this.state.current.getFullYear();
        // const date = this.state.current.getDate();

        let upperDate = null;
        if (this.props.showHeader) {
            upperDate = (
                <div
                    className="flex-2 header center"
                    style={{
                        backgroundColor: this.props.accentColor,
                    }}
                >
                    <p className="header-month">{tMonth.toUpperCase()}</p>
                    <p className="header-day">{tDate}</p>
                </div>
            );
        }
        return (
            <div className={this.props.orientation}>
                {upperDate}
                <div className="padding">
                    <div className="month">
                        <div className="today" onClick={() => this.refreshToday()}>今天</div>
                        <IconButton className="month-arrow-left" onClick={() => this.prev()}>
                            <PlayArrow style={{ transform: 'rotate(180deg)' }} />
                        </IconButton>
                        <div
                            style={moment().month() === currentMonth ? { outline: '2px solid #9dd29d' } : {}}
                            className="month-title"
                            onClick={() => this.onClickMonth(this.state.current)}
                        >{month}<br /><span className="month-year">{year}</span>
                        </div>
                        <IconButton className="month-arrow-left" onClick={() => this.next()}>
                            <PlayArrow />
                        </IconButton>
                    </div>
                    <div className="footer1">
                        {header}
                        {days}
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    accentColor: PropTypes.string,
    onDatePicked: PropTypes.func,
    onChoseMonth: PropTypes.func,
    showHeader: PropTypes.bool,
    orientation: PropTypes.string,
};

Calendar.defaultProps = {
    accentColor: '#00C1A6',
    onDatePicked() { },
    onChoseMonth: () => { },
    showHeader: true,
    orientation: 'flex-col',
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(Calendar);
