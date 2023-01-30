class Helper {
  static formatDate(d) {
    const newDate = new Date(d);

    let date = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let year = newDate.getFullYear();

    return `${year}-${month}-${date}`;
  }

  static getCurrentDate() {
    const currentDate = new Date();

    let date = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();

    return `${year}-${month}-${date}`;
  }

  static isValidDate(date) {
    const initDate = new Date(date);
    return (
      Object.prototype.toString.call(initDate) === "[object Date]" &&
      !isNaN(initDate) &&
      initDate > 0
    );
  }
}

export default Helper;
