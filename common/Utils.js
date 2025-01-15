const processHrTimeToSeconds = (hrTime) => {
    return (hrTime[0] + hrTime[1] / 1e9).toFixed(9)
}

export default {
    processHrTimeToSeconds,
}