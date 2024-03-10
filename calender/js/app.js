document.addEventListener('DOMContentLoaded', function () {
  console.log("文档加载完成");
  // 加载当前月
  let now = new Date();
  rendererDates(getDaysOfMonth(now.getFullYear(), now.getMonth() + 1));
});

function getDaysOfMonth(year, month) {
  let result = [];
  // 创建一个日期对象，设置为指定年份和月份的第一天
  let firstDay = new Date(year, month - 1, 1);
  let dayOfWeekBegin = firstDay.getDay();
  let begin = new Date(firstDay.getTime());
  if (dayOfWeekBegin > 1) {
    begin.setDate(firstDay.getDate() - dayOfWeekBegin + 1);
    getAllDatesBetween(begin, getPreviousDate(firstDay)).forEach((item, idx) => {
      result.push({code: "before", data: item})
    })
  }

  let lastDay = new Date(firstDay.getTime());
  lastDay.setMonth(firstDay.getMonth() + 1);
  lastDay.setDate(lastDay.getDate() - 1);
  getAllDatesBetween(firstDay, lastDay).forEach((item, idx) => {
    result.push({code: "now", data: item})
  });

  let dayOfWeekEnd = lastDay.getDay();
  let end = new Date(lastDay.getTime());
  if (dayOfWeekEnd < 6 && dayOfWeekEnd > 0) {
    end.setDate(lastDay.getDate() + 7 - dayOfWeekEnd);
    getAllDatesBetween(getNextDate(lastDay), end).forEach((item, idx) => {
      result.push({code: "after", data: item})
    })
  }
  return result;
}

function getPreviousDate(date) {
  date = date || new Date();
  let result = new Date(date.getTime());
  result.setDate(result.getDate() - 1);
  return result;
}

function getNextDate(date) {
  date = date || new Date();
  let result = new Date(date.getTime());
  result.setDate(result.getDate() + 1);
  return result;
}


function formatDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1，并且保证是两位数
  let day = ("0" + date.getDate()).slice(-2); // 保证日期是两位数
  let hours = ("0" + date.getHours()).slice(-2); // 保证小时数是两位数
  let minutes = ("0" + date.getMinutes()).slice(-2); // 保证分钟数是两位数
  let seconds = ("0" + date.getSeconds()).slice(-2); // 保证秒数是两位数
  return Number(month) + "月" + day + "号";
}

function getAllDatesBetween(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate.getTime());

  // 确保startDate早于或等于endDate
  if (currentDate > endDate) {
    [currentDate, endDate] = [endDate, currentDate];
  }

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate.getTime())); // 添加当前日期的副本到数组
    currentDate.setDate(currentDate.getDate() + 1); // 增加一天
  }
  return dates;
}


function rendererDates(days) {
  let forLength = days.length / 7;
  let weekTarget = document.getElementById("calendar");
  removeAllChildren(weekTarget);
  for (let i = 0; i < forLength; i++) {
    let newWeek = document.createElement("div");
    newWeek.classList.add("week")
    // newWeek.style.backgroundColor = "#777";
    // 添加到 #calendar下
    weekTarget.appendChild(newWeek);

    for (let j = 0; j < 7; j++) {
      // newWeeksDay.innerText = formatDate(item.data);
      let item = days[i * 7 + j];

      let newWeeksDay = document.createElement("div");
      newWeeksDay.classList.add("weeks-day", item.code);
      newWeek.appendChild(newWeeksDay);

      let dateSpan = document.createElement("span");
      dateSpan.classList.add("date");
      dateSpan.innerText = formatDate(item.data);

      // 添加日期
      newWeeksDay.appendChild(dateSpan);

      // 创建任务
      let idxLength = Math.ceil((Math.random() * 100)) % 5;
      for (let k = 0; k < idxLength; k++) {
        let taskn = document.createElement("span");
        taskn.classList.add("task");
        taskn.innerHTML = "任务" + k;
        if (Math.ceil((Math.random() * 100)) % 2  === 1) {
          taskn.style.backgroundImage="linear-gradient(0deg,#43e97b 0%, #38f9d7 100%)";
        }
        newWeeksDay.appendChild(taskn);
      }
    }
  }

  function removeAllChildren(target) {
    let children = Array.from(target.children);
    // 遍历子元素列表并移除它们
    children.forEach(function (child, idx) {
      if (idx === 0) {
        return;
      }
      target.removeChild(child);
    });
  }
}
