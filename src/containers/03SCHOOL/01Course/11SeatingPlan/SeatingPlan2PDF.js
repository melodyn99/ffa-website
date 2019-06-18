// Utils
import * as jsPDF from "jspdf";
import {
    makeColorString,
    // getStudentNumber, 
    getStudentName
} from "./Seat";
import { getColorBrand } from "./StudentContainer";
import { getColumnLetter } from "./SeatTable";

// Some constants
const RULE_HEIGHT = 60;
const RULE_WIDTH = 60;

const MARGIN_Y = 60;
const MARGIN_X = 30;

const PAPER_HEIGHT_LANSCAPE = 210 / 25.4 * 96;
const PAPER_WIDTH_LANSCAPE = 297 / 25.4 * 96;

const HEIGHT_LANSCAPE = PAPER_HEIGHT_LANSCAPE - MARGIN_Y - RULE_HEIGHT * 2;
const WIDTH_LANSCAPE = PAPER_WIDTH_LANSCAPE - MARGIN_X - RULE_WIDTH * 2;

let SPACES_BETWEEN_TABLE_Y = 10;
let SPACES_BETWEEN_TABLE_X = 20;

const TABLE_MAX_HEIGHT = 75;

// Compute size of elements on the canvas
const compute = ({
    // plan, 
    tables, student_per_table,
    // column, 
    row }) => {
    const totalTableSpaceHeight = Math.max(row - 1, 0) * SPACES_BETWEEN_TABLE_Y;
    let width = WIDTH_LANSCAPE - Math.max(tables.length - 1, 0) * SPACES_BETWEEN_TABLE_X;
    let height = HEIGHT_LANSCAPE - totalTableSpaceHeight - RULE_HEIGHT * 2;

    let seat_width = width / (tables.length * student_per_table);
    let table_width = seat_width * student_per_table;

    let table_height = Math.min(height / row, TABLE_MAX_HEIGHT);
    let total_height = table_height * row + totalTableSpaceHeight;

    let start_y = (HEIGHT_LANSCAPE / 2) - (total_height / 2) + MARGIN_Y + RULE_HEIGHT * 2;

    return { seat_width, table_width, table_height, start_y };
}

// Draw a line
const line = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(Math.floor(x1), Math.floor(y1));
    ctx.lineTo(Math.floor(x2), Math.floor(y2));
    ctx.stroke();
}

// Draw a stroke rectangle
const rect = (ctx, x, y, width, height) => {
    ctx.strokeStyle = 'black';
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.rect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
    ctx.stroke();
}

// Draw a filled rectangle
const fillRect = (ctx, x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x + 1), Math.floor(y + 1), Math.floor(width - 2), Math.floor(height - 2));
    ctx.stroke();
}

// Draw text
const fillText = (ctx, x, y, text, size, color) => {
    ctx.font = `${size || 32}px Arial`;
    ctx.fillStyle = color || "black";
    ctx.fillText(text, Math.floor(x), Math.floor(y));
}

// Draw tables
const draw_tables = (
    ctx,
    {
        // seat_width, 
        table_width, table_height,
        // width, height, 
        start_y }, // computed
    {
        // plan, 
        tables,
        // student_per _table, column, 
        row, view } // props
) => {
    let y = start_y;
    let x_seats = [];
    let y_seats = [];

    if (view !== "top")
        tables = Array.from(tables).reverse();

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, PAPER_WIDTH_LANSCAPE, PAPER_HEIGHT_LANSCAPE);

    for (let c_row = 0; c_row < row; c_row += 1) {
        let x = MARGIN_X / 2 + RULE_WIDTH;

        for (const [index_table,
            // table
        ] of tables.entries()) {
            // Draw the rectange of the table
            rect(ctx, x, y, table_width, table_height);

            const nseat = tables[index_table]; // number on student on this table
            let x_seat = x + (table_width / nseat);
            x_seats.push({ start: x, end: x_seat }); // Keep track of student coords
            for (let i = 0; i < nseat - 1; i += 1) {
                // Draw line which separate students on the tables
                line(ctx, x_seat, y, x_seat, y + table_height);
                const end = (table_width / nseat);
                x_seats.push({ start: x_seat, end: x_seat + end });
                x_seat += end;
            }
            x += table_width + SPACES_BETWEEN_TABLE_X;
        }
        y_seats.push(y);
        y += table_height + SPACES_BETWEEN_TABLE_Y;
    }

    return { x_seats, y_seats };
}

function draw_rules(ctx, seats_coords, computed, props) {
    const { x_seats, y_seats } = seats_coords;
    const { table_height } = computed;
    const { column, row, view } = props;
    const labelFontHeight = Math.min(RULE_HEIGHT, RULE_WIDTH) / 1.5;
    const labelTextColour = 'black';
    const columnLetterWidth = ctx.measureText('W').width;

    function drawColumnLetters(y) {
        for (let c = 0; c < column; c += 1) {
            const xSeat = x_seats[view === 'top' ? c : column - c - 1];
            const x = xSeat.start + (xSeat.end - xSeat.start) / 2;
            const letter = getColumnLetter(c);
            fillText(ctx, x - columnLetterWidth / 2,
                y + (labelFontHeight / 3),
                letter, labelFontHeight, labelTextColour);
        }
    }
    drawColumnLetters(y_seats[0] - RULE_HEIGHT / 2);
    drawColumnLetters(y_seats[y_seats.length - 1] + table_height + RULE_HEIGHT / 2);

    function drawRowDigit(x) {
        for (let r = 0; r < row; r += 1) {
            const y = y_seats[view === 'top' ? row - r - 1 : r] + table_height / 2;
            const digit = r + 1;
            fillText(ctx, x - ctx.measureText(digit).width / 2,
                y + (labelFontHeight / 3),
                digit, labelFontHeight, labelTextColour);
        }
    }
    const digitLabelMargin = Math.min(ctx.measureText(row).width, RULE_WIDTH);
    drawRowDigit(x_seats[0].start - digitLabelMargin);
    drawRowDigit(x_seats[column - 1].end + digitLabelMargin);
}

// Return the coord on the canvas of this row x column
const get_coord = ({ x_seats, y_seats }, row, column, total_row, total_column, view) => {
    // console.log(view);
    const y_index = view === "top"
        ? total_row - (row + 1)
        : row;
    const x_index = view === "top"
        ? column
        : total_column - (column + 1);
    return {
        x_start: x_seats[x_index].start,
        x_end: x_seats[x_index].end,
        y: y_seats[y_index]
    }
}

const ELLIPSIS = '..';
function trimTextToFitRect(this_seat_width, text, ctx) {
    let width = ctx.measureText(text).width;
    if (width > this_seat_width) {
        let lowerBound = 0;
        let upperBound = text.length - 1;
        let delta;
        let newText;
        do {
            delta = Math.floor((upperBound - lowerBound) / 2);
            const middle = lowerBound + delta;
            newText = text.substring(0, middle) + ELLIPSIS;
            width = ctx.measureText(newText).width;
            if (width === this_seat_width) {
                lowerBound = middle;
                upperBound = middle;
            } else if (width < this_seat_width) {
                lowerBound = middle;
            } else {
                upperBound = middle;
            }
        } while (lowerBound < upperBound && delta > 0);
        text = newText;
    }
    return { width, text };
}

// Filling seats with colors & text
const draw_seats = (ctx, seats_coords, { table_height,
    // seat_width 
}, { row, column, plan_seat, companies, view }) => {
    for (let r = 0; r < row; r += 1) {
        for (let c = 0; c < column; c += 1) {

            const letter = getColumnLetter(c);
            const id = `${r + 1}${letter}`;
            const { x_start, x_end, y } = get_coord(seats_coords, r, c, row, column, view);
            const this_seat_width = x_end - x_start;
            let font_height = Math.min(table_height, this_seat_width) / 1.5;
            if (this_seat_width < table_height) {
                font_height *= 0.75;
            }

            let text = id;
            let brandText = '';
            let text_color = null;
            let color = null;
            let isSeatReserved = false;

            if (plan_seat.has(id)) {
                const onSeat = plan_seat.get(id);
                isSeatReserved = onSeat.status === "reserved";
                if (isSeatReserved) {
                    text = "留座"; color = "#FF0000";
                } else {
                    text = getStudentName(companies, onSeat.conference_student);
                    brandText = onSeat ? onSeat.student_brand : '';
                    color = makeColorString(onSeat);
                }
            } else {
                text_color = "grey";
            }

            color && fillRect(ctx, x_start, y, Math.ceil(this_seat_width), table_height, color);

            if (text) {
                let yDelta = (table_height / 2) + (font_height / 3);
                let brandWidth = 0;
                if (brandText) {
                    font_height /= 2;
                    yDelta /= 2;
                } else if (isSeatReserved) {
                    font_height = font_height * 0.75;
                }
                ctx.font = `${font_height}px Arial`;
                let width;
                ({ width, text } = trimTextToFitRect(this_seat_width, text, ctx));
                if (brandText) {
                    ({ width: brandWidth, text: brandText } = trimTextToFitRect(this_seat_width, brandText, ctx));
                }
                fillText(ctx, x_start + (this_seat_width / 2) - (Math.min(width, this_seat_width) / 2),
                    y + yDelta,
                    text, font_height, text_color);
                if (brandText) {
                    fillText(ctx, x_start + (this_seat_width / 2) - (Math.min(brandWidth, this_seat_width) / 2),
                        y + yDelta * 2,
                        brandText, font_height, text_color);
                }
            }
        }
    }
}

// Draw title of the pdf
const draw_description = (ctx, name) => {
    const FONT_SIZE = 50;

    ctx.font = `${FONT_SIZE}px Arial`;
    const { width } = ctx.measureText(name);
    fillText(ctx, (WIDTH_LANSCAPE / 2) - (width / 2), 50, name, FONT_SIZE, "black");
}

// Not enough space on the page, we're adding one
const add_page = (pdf, ctx, canvas) => {
    const urlImage = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(urlImage, 'JPEG', 0, 0);

    pdf.addPage("a4", "portrait");

    ctx.beginPath();
    ctx.font = `20px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, PAPER_HEIGHT_LANSCAPE, PAPER_WIDTH_LANSCAPE);
}

const draw_companies = (ctx, pdf, canvas, { plan, companies, plan_id }) => {
    const X_START = 100;
    const Y_START = MARGIN_Y / 2;
    const LEGEND_WIDTH = PAPER_HEIGHT_LANSCAPE - X_START * 2;
    const LEGEND_HEIGHT = 30;
    const FONT_SIZE = 20;
    const STUDENT_NAME_LINE_HEIGHT = 30;
    const LEGEND_MARGIN_TOP = 20;
    const LEGEND_MARGIN_BOTTOM = 10;
    const LEGEND_TEXT_Y_DELTA = (LEGEND_HEIGHT / 2 + FONT_SIZE / 3);

    let x = X_START;
    let y = Y_START;

    ctx.font = `${FONT_SIZE}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, PAPER_HEIGHT_LANSCAPE, PAPER_WIDTH_LANSCAPE);
    for (const company of companies) {
        const color = getColorBrand(plan.brands, company.brand);
        rect(ctx, x, y, LEGEND_WIDTH, LEGEND_HEIGHT);
        fillRect(ctx, x, y, LEGEND_WIDTH, LEGEND_HEIGHT, color);
        fillText(ctx, x + 50, y + LEGEND_TEXT_Y_DELTA, company.brand, ctx.measureText(company.brand));
        y += (LEGEND_HEIGHT + LEGEND_MARGIN_BOTTOM);
        for (const [
            // index, 
            student] of company.students.entries()) {
            const y_text = y + LEGEND_TEXT_Y_DELTA;
            fillText(ctx, x + 50, y_text, student.name, FONT_SIZE);

            if (plan_id.has(student.conference_student_id)) {
                const { sequence, seat } = plan_id.get(student.conference_student_id);
                const seat_number = `${sequence}${seat}`;
                fillText(ctx, x + 500, y_text, seat_number, FONT_SIZE);
            }

            y += STUDENT_NAME_LINE_HEIGHT;

            if (y > PAPER_WIDTH_LANSCAPE - MARGIN_Y / 2 - STUDENT_NAME_LINE_HEIGHT) {
                add_page(pdf, ctx, canvas);
                y = Y_START;
            }

        }
        if (y !== Y_START) {
            y += LEGEND_MARGIN_TOP;
            if (y > PAPER_WIDTH_LANSCAPE - MARGIN_Y / 2 - STUDENT_NAME_LINE_HEIGHT - LEGEND_HEIGHT - LEGEND_MARGIN_BOTTOM - LEGEND_TEXT_Y_DELTA) {
                add_page(pdf, ctx, canvas);
                y = Y_START;
            }
        }
    }
}

export const SeatingPlan2PDF = (props) => {
    const {
        // plan, tables, student_per_table, 
        column, row, viewingSeminar } = props;

    SPACES_BETWEEN_TABLE_Y = column > 11 ? 4 : 10;
    SPACES_BETWEEN_TABLE_X = row > 11 ? 6 : 20;

    const name = viewingSeminar.name || props.plan.seating_plan_type.name || "Seating plan";
    const computed = compute(props);

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    canvas.width = PAPER_WIDTH_LANSCAPE;
    canvas.height = PAPER_HEIGHT_LANSCAPE;
    canvas.style.position = "absolute";

    const ctx = canvas.getContext('2d');

    // Draw seating plan
    const seats_coords = draw_tables(ctx, computed, props);
    draw_rules(ctx, seats_coords, computed, props);
    draw_seats(ctx, seats_coords, computed, props);
    draw_description(ctx, name);
    ctx.translate(0.5, 0.5)

    const seating_plan = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
        format: 'a4',
        unix: "px",
        orientation: 'landscape'
    });
    pdf.addImage(seating_plan, 'JPEG', 0, 0);
    canvas.parentNode.removeChild(canvas);

    if (props.companies && props.companies.length) {
        // Draw companies
        const canvas2 = document.createElement('canvas');
        document.body.appendChild(canvas2);
        canvas2.height = PAPER_WIDTH_LANSCAPE;
        canvas2.width = PAPER_HEIGHT_LANSCAPE;
        canvas2.style.position = "absolute";
        const ctx2 = canvas2.getContext('2d');

        pdf.addPage("a4", "portrait");
        draw_companies(ctx2, pdf, canvas2, props);

        const companies = canvas2.toDataURL("image/jpeg", 1.0);
        pdf.addImage(companies, 'JPEG', 0, 0);
        canvas2.parentNode.removeChild(canvas2);
    }
    pdf.save(name + ".pdf");
}
