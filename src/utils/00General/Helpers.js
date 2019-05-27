import moment from "moment";

export const mongoIdTimestamp = (id, format) => {
    let ts = id.toString().substring(0,8);
    let t = moment( parseInt( ts, 16 ) * 1000 );
    if (format === false)
        return t;
    return momentTime(t, format);
}

export const momentTime = (time, format) => {
    if (typeof(time.utcOffset) === "function")
        return time.utcOffset(8).format(format);

    console.log("***** ERROR: not moment - ", time, time.utcOffset);
    return time;
}

