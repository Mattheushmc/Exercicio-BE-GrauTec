module.exports = {
  isValidDateString(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  },
  isValidTimeString(t) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
  },
  timesOverlap(startA, endA, startB, endB) {
    return !(endA <= startB || endB <= startA);
  }
};
