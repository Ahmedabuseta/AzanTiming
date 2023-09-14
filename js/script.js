let gregorianDate = document.querySelector(".gregorian");
let hijriDate = document.querySelector(".hijri");
let azanFajr  = document.querySelector(".azan-fajr");
let azanSunrize  = document.querySelector(".azan-sunrize");
let azanDuhr = document.querySelector(".azan-duhr");
let azanAsr  = document.querySelector(".azan-asr");
let azanMaghrib = document.querySelector(".azan-maghrib");
let azanIsha = document.querySelector(".azan-isha");
let fajrTime = document.querySelector(".fajr-time")
let sunrizeTime = document.querySelector(".sunrize-time")
let duhrTime = document.querySelector(".duhr-time")
let asrTime = document.querySelector(".asr-time")
let maghribTime = document.querySelector(".maghrib-time")
let ishaTime = document.querySelector(".isha-time")
const governorates =[
  {"id":"1","governorate_name_ar":"القاهرة","governorate_name_en":"Al Qāhirah"},
  {"id":"2","governorate_name_ar":"الجيزة","governorate_name_en":"Al Jīzah"},
  {"id":"3","governorate_name_ar":"الأسكندرية","governorate_name_en":"Al Iskandarīyah"},
  {"id":"4","governorate_name_ar":"الدقهلية","governorate_name_en":"Ad Daqahlīyah"},
  {"id":"5","governorate_name_ar":"البحر الأحمر","governorate_name_en":"Al Baḩr al Aḩmar"},
  {"id":"6","governorate_name_ar":"البحيرة","governorate_name_en":"Al Buḩayrah"},
  {"id":"7","governorate_name_ar":"الفيوم","governorate_name_en":"Al Fayyūm"},
  {"id":"8","governorate_name_ar":"الغربية","governorate_name_en":"Al Gharbīyah"},
  {"id":"9","governorate_name_ar":"الإسماعلية","governorate_name_en":"Al Ismā'īlīyah"},
  {"id":"10","governorate_name_ar":"المنوفية","governorate_name_en":"Al Minūfīyah"},
  {"id":"11","governorate_name_ar":"المنيا","governorate_name_en":"Al Minyā"},
  {"id":"12","governorate_name_ar":"القليوبية","governorate_name_en":"Al Qalyūbīyah"},
  {"id":"13","governorate_name_ar":"الوادي الجديد","governorate_name_en":"Al Wādī al Jadīd"},
  {"id":"14","governorate_name_ar":"السويس","governorate_name_en":"As Suways"},
  {"id":"15","governorate_name_ar":"اسوان","governorate_name_en":"Aswān"},
  {"id":"16","governorate_name_ar":"اسيوط","governorate_name_en":"Asyūţ"},
  {"id":"17","governorate_name_ar":"بني سويف","governorate_name_en":"Banī Suwayf"},
  {"id":"18","governorate_name_ar":"بورسعيد","governorate_name_en":"Būr Sa‘īd"},
  {"id":"19","governorate_name_ar":"دمياط","governorate_name_en":"Dumyāţ"},
  {"id":"20","governorate_name_ar":"الشرقية","governorate_name_en":"Ash Sharqīyah"},
  {"id":"21","governorate_name_ar":"جنوب سيناء","governorate_name_en":"Janūb Sīnā'"},
  {"id":"22","governorate_name_ar":"كفر الشيخ","governorate_name_en":"Kafr ash Shaykh"},
  {"id":"23","governorate_name_ar":"مطروح","governorate_name_en":"Maţrūḩ"},
  {"id":"24","governorate_name_ar":"الأقصر","governorate_name_en":"Al Uqşur"},
  {"id":"25","governorate_name_ar":"قنا","governorate_name_en":"Qinā"},
  {"id":"26","governorate_name_ar":"شمال سيناء","governorate_name_en":"Shamāl Sīnā'"},
  {"id":"27","governorate_name_ar":"سوهاج","governorate_name_en":"Sūhāg"}
  ] 
  const selectCity = document.querySelector("#cities");
  let cityName ="";
    // Access the governorate array
    for( let governorate of governorates){
        selectCity.innerHTML +=`
        <option value="${governorate.governorate_name_ar}">
          ${governorate.governorate_name_ar}
        </option>
        `;
    }
    selectCity.addEventListener("change",()=>{
      for( let city of governorates){
        if(city.governorate_name_ar == selectCity.value){
          cityName = city.governorate_name_en;
          console.log(city.governorate_name_en)
        }
      }
      getPreyerTiminigOfCity(cityName)
    });
    

    let intervalSunrise ;
    let intervalFajr ;
    let intervalDhuhr;
    let intervalAsr ;
    let intervalMaghrib ;
    let intervalIsha ;

getPreyerTiminigOfCity("Al Qāhirah");
let timerPlace = document.getElementsByClassName("timer");
function getPreyerTiminigOfCity(cityName){
  let url="http://api.aladhan.com/v1/timingsByCity?city="+cityName+"&country=EG&method=3"
  fetch(url)
  .then((response) => response.json())
  .then((json) => {
      let azanDay = json.data
      gregorianDate.innerHTML=azanDay.date.readable;
      hijriDate.innerHTML=azanDay.date.hijri.day+","+azanDay.date.hijri.month.en+","+azanDay.date.hijri.year
      let azanTiming =azanDay.timings
      fajrTime.innerHTML=azanTiming.Fajr;
      sunrizeTime.innerHTML=azanTiming.Sunrise;
      duhrTime.innerHTML=azanTiming.Dhuhr;
      asrTime.innerHTML=azanTiming.Asr;
      maghribTime.innerHTML=azanTiming.Maghrib;
      ishaTime.innerHTML=azanTiming.Isha;

      let fajrTimeStamp = changeTimeToTimeStamp(azanTiming.Fajr);
      let sunriseTimeStamp = changeTimeToTimeStamp(azanTiming.Sunrise);
      let dhuhrtimeStamp = changeTimeToTimeStamp(azanTiming.Dhuhr);
      let asrTimeStamp = changeTimeToTimeStamp(azanTiming.Asr);
      let maghribTimeStamp = changeTimeToTimeStamp(azanTiming.Maghrib);
      let ishaTimeStamp = changeTimeToTimeStamp(azanTiming.Isha);
      let midNightTimeStamp =changeTimeToTimeStamp("24:00")
      let fajrNextDayTimeStamp =changeTimeToTimeStampNextday(azanTiming.Fajr);
      const timeNow= new Date();
     let getTimeNow = timeNow.getTime();
      console.log(fajrNextDayTimeStamp)
      if(getTimeNow >=fajrTimeStamp && getTimeNow<=sunriseTimeStamp){
        if(intervalSunrise){
          clearInterval(intervalSunrise)
        }
          timerPlace = document.getElementsByClassName("timer")[1];
          intervalSunrise = setInterval(()=>remainTime(azanTiming.Sunrise),1000);
        upcomingPreyStyle(azanSunrize,"sunrize");
        if(getTimeNow==sunriseTimeStamp){
          removeUpcomingPrey(azanSunrize,intervalSunrise, "sunrise")
        }
      }
      if(getTimeNow >=sunriseTimeStamp && getTimeNow<=dhuhrtimeStamp){
        if(intervalDhuhr){
          clearInterval(intervalDhuhr)
        }
          timerPlace = document.getElementsByClassName("timer")[2];
          intervalDhuhr = setInterval(()=>remainTime(azanTiming.Dhuhr),1000);
        upcomingPreyStyle(azanDuhr,"dhuhr");
        if(getTimeNow==dhuhrtimeStamp){
          removeUpcomingPrey(azanDuhr,intervalDhuhr, "dhuhr")
        }
      }
      if(getTimeNow >=dhuhrtimeStamp && getTimeNow<=asrTimeStamp){
        if(intervalAsr){
          clearInterval(intervalAsr)
        }
          timerPlace = document.getElementsByClassName("timer")[3];
          intervalAsr = setInterval(()=>remainTime(azanTiming.Asr),1000);
        upcomingPreyStyle(azanAsr,"asr");
        if(getTimeNow==asrTimeStamp){
          removeUpcomingPrey(azanAsr,intervalAsr, "asr")
        }
      }
      if(getTimeNow >=asrTimeStamp && getTimeNow<=maghribTimeStamp){
        if(intervalMaghrib){
          clearInterval(intervalMaghrib)
        }
          timerPlace = document.getElementsByClassName("timer")[4];
          intervalMaghrib = setInterval(()=>remainTime(azanTiming.Maghrib),1000);
        upcomingPreyStyle(azanMaghrib,"maghrib");
        if(getTimeNow==maghribTimeStamp){
          removeUpcomingPrey(azanMaghrib,intervalMaghrib, "maghrib")
        }
      }
      if(getTimeNow >=maghribTimeStamp && getTimeNow<=ishaTimeStamp){
        if(intervalIsha){
          clearInterval(intervalIsha)
        }
          timerPlace = document.getElementsByClassName("timer")[5];
          intervalIsha = setInterval(()=>remainTime(azanTiming.Isha),1000);
        upcomingPreyStyle(azanIsha,"isha");
        if(getTimeNow==ishaTimeStamp){
          removeUpcomingPrey(azanIsha,intervalIsha, "isha")
        }
      }
      if(getTimeNow >=ishaTimeStamp   || getTimeNow>=midNightTimeStamp && getTimeNow<=fajrNextDayTimeStamp){
        if(intervalFajr){
          clearInterval(intervalFajr)
        }
        timerPlace = document.getElementsByClassName("timer")[0];
        if(getTimeNow<=midNightTimeStamp){
          intervalFajr = setInterval(()=>remainTime("24:00",5,16),1000);
        }
        if(getTimeNow<=fajrTimeStamp){
          intervalFajr = setInterval(()=>remainTime(azanTiming.Fajr),1000);
        }
        upcomingPreyStyle(azanFajr,"fajr");
        if(getTimeNow==fajrTimeStamp){
          removeUpcomingPrey(azanFajr,intervalFajr, "fajr")
        }
      }
})}
//  upcoming prey 
function upcomingPreyStyle(prey,pryName){
  console.log(prey)
  prey.classList.add(pryName,"text-light","active","my-3")
  let preyName = prey.firstElementChild
  preyName.style.setProperty("font-size","12px","important")
  preyName.style.color="#1ba78b"
  let upcoming = document.querySelector(".upcoming")
  if(!upcoming){
    var p =document.createElement("p")
    p.classList.add("m-0","upcoming")
    prey.insertBefore(p,preyName)
    p.innerHTML="upcoming prey"
  }

  console.log(preyName)
}
function removeUpcomingPrey(prey,interval, preyName){
  prey.classList.remove(preyName,"text-light","active")
  var preyName = prey.firstElementChild
  preyName.style.color="#000"
  let upcoming = document.querySelector(".upcoming")
  upcoming.remove
  clearInterval(interval)
  prey.classList.remove(preyName)
}


// Update the displayed time every second using setInterval
// setInterval(updateTime, 1000);
function remainTime(preytime,a=0,b=0){
  const timeNow= new Date();
timeNow.getHours();
timeNow.getMinutes();
timeNow.getSeconds();
  let hourMuinteArr=preytime.split(":")
  let hours = parseInt(hourMuinteArr[0], 10);
  let minutes = parseInt(hourMuinteArr[1], 10);
  let remainingHours = Math.abs(hours - timeNow.getHours()-1)+a;
  let remainingMinutes = Math.abs(59+minutes -timeNow.getMinutes())+b;

  if (remainingMinutes < minutes) {
    remainingHours--;
    remainingMinutes += 60;
  }  if (remainingMinutes >59) {
    remainingHours++;
    remainingMinutes -= 60;
  }
  timerPlace.innerHTML=`
  ${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(Math.abs(60-timeNow.getSeconds())).padStart(2, '0')}
`
  console.log(timeNow.getSeconds())
}
// setInterval(remaiTime,1000)


 function changeTimeToTimeStamp(time){
  let hourMuinteArr=time.split(":")
  let hours = parseInt(hourMuinteArr[0], 10);
  let minutes = parseInt(hourMuinteArr[1], 10);
  const date1 = new Date();
  date1.setHours(hours,minutes,0,0);
  const timeStamp = date1.getTime()
  return timeStamp;
  // console.log(timeStamp)
 }
 function changeTimeToTimeStampNextday(time){
  let hourMuinteArr=time.split(":")
  let hours = parseInt(hourMuinteArr[0], 10);
  let minutes = parseInt(hourMuinteArr[1], 10);
  let nextDay = new Date()
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(hours,minutes,0,0);
  const timeStamp = nextDay.getTime()
  return timeStamp;
 }