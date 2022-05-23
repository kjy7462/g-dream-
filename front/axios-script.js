/* 
1. 지도 생성 & 확대 축소 컨트롤러
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
3. 여러개 마커 찍기
  * 주소 - 좌표 변환 (지도 라이브러리)
4. 마커에 인포윈도우 붙이기
  * 마커에 클릭 이벤트로 인포윈도우
  * url에서 섬네일 따기
  * 클릭한 마커로 지도 센터 이동
5. 카테고리 분류
*/

/*
**********************************************************
1. 지도 생성 & 확대 축소 컨트롤러
https://apis.map.kakao.com/web/sample/addMapControl/
*/
var radius = 100000;
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.65835990000001,126.8320201), //지도의 중심좌표. 서울 한가운데
  level: 8, //지도의 레벨(확대, 축소 정도) 3에서 8레벨로 확대
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
//현재 위치의 마커 뿌리기
var markerPosition  = new kakao.maps.LatLng(37.65835990000001,126.8320201); 
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
  // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
// 마커를 생성합니다
var markerHere = new kakao.maps.Marker({
    map: map,
    position: markerPosition,
    image : markerImage 
});
/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/
async function getDataSet(category){
  let qs = category;
  if(!qs){
    qs = "";

  }
  const dataSet = await axios({
    method: "GET",
    url:`http://localhost:3000/franchisee?category=${qs}`,
    headers: {},
    data: {},
  });
  return dataSet.data.result;
}
getDataSet();

// 데이터 추가하기 
async function addDataSet(){
  
}
/*
**********************************************************
3. 여러개 마커 찍기
  * 주소 - 좌표 변환
https://apis.map.kakao.com/web/sample/multipleMarkerImage/ (여러개 마커)
https://apis.map.kakao.com/web/sample/addr2coord/ (주소로 장소 표시하기)
*/
button1 = document.getElementById("1km");
button2 = document.getElementById('3km');
button3 = document.getElementById('10km');

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소-좌표 변환 함수
function getCoordsByAddress(address) {
  return new Promise((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        resolve(coords);
        return;
      }
      reject(new Error("getCoordsByAddress Error: not Vaild Address"));
    });
  });
}

/* 
*************************************************************
4. 마커에 인포윈도우 붙이기
  * 마커에 클릭 이벤트로 인포윈도우 https://apis.map.kakao.com/web/sample/multipleMarkerEvent/
  * url에서 섬네일 따기
  * 클릭한 마커로 지도 센터 이동 https://apis.map.kakao.com/web/sample/moveMap/
*/
function getContent(data) {
  

  // 인포윈도우 가공하기
  return `
  <div class = "wrap">
  <div class="info">
   <div class="infowindow-img-container">
        <img
          src="${data.category}.png"
          class="infowindow-img"
        />
      </div>
        <h1 class="title">${data.title}</h1>
        <div class="body">
        <a href="https://map.kakao.com/link/to/${data.title},${data.lat},${data.longi}" class="infowindow-btn" target="_blank">길찾기</a>
        <h2 class="infowindow-address">${data.address}</h2>
        <h2 class="infowindow-open"> 오픈시간:${data.openTime},마감시간 ${data.closeTime}</h2>
        <h2 class ="infowindow-phone">전화번호 ${data.phone}</h2>   
        </div>
    </div>
    </div>
  `;
}

async function setMap(dataSet) {
  markerArray = [];
  infowindowArray = [];

  for (var i = 0; i < dataSet.length; i++) {
    // 마커를 생성합니다
    let coords = await getCoordsByAddress(dataSet[i].address);
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: coords, // 마커를 표시할 위치
    });
  
    markerArray.push(marker);
    markerArray.forEach(function(m) {
    var c1 = map.getCenter();
    var c2 = m.getPosition();
    var poly = new kakao.maps.Polyline({
      // map: map, 을 하지 않아도 거리는 구할 수 있다.
      path: [c1, c2]
    });
    var dist = poly.getLength(); // m 단위로 리턴
    if (dist < radius) {
        m.setMap(map);
    } else {
        m.setMap(null);
    }
});
    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: getContent(dataSet[i]),
      position: marker.getPosition() // 인포윈도우에 표시할 내용
    });

    infowindowArray.push(infowindow);

    console.log(markerArray, infowindowArray);

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(
      marker,
      "click",
      makeOverListener(map, marker, infowindow, coords)
    );
    kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));
  }
  
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
// 1. 클릭시 다른 인포윈도우 닫기
// 2. 클릭한 곳으로 지도 중심 옮기기
function makeOverListener(map, marker, infowindow, coords) {
  return function () {
    // 1. 클릭시 다른 인포윈도우 닫기
    closeInfoWindow();
    infowindow.open(map, marker);
    // 2. 클릭한 곳으로 지도 중심 옮기기
    map.panTo(coords);
  };
}

let infowindowArray = [];
function closeInfoWindow() {
  for (let infowindow of infowindowArray) {
    infowindow.close();
  }
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

/*
**********************************************
5. 카테고리 분류
*/

// 카테고리
const categoryMap = {
  korea: "편의점",
  china: "중식",
  japan: "제과점",
  america: "한식",
  wheat: "반찬",
  meat: "패스트푸드",
  sushi: "양식",
  etc: "분식",
};

const categoryList = document.querySelector(".category-list");
categoryList.addEventListener("click", categoryHandler);

async function categoryHandler(event) {
  const categoryId = event.target.id;
  const category = categoryMap[categoryId];

  // 데이터 분류
  let categorizedDataSet = await getDataSet(category);


  // 기존 마커 삭제
  closeMarker();

  // 기존 인포윈도우 닫기
  closeInfoWindow();

  setMap(categorizedDataSet);
}

let markerArray = [];
function closeMarker() {
  for (marker of markerArray) {
    marker.setMap(null);
  }
}


// 일정 거리 내의 가맹점을 보여주자
const lengthList = document.querySelector(".length-list");
lengthList.addEventListener("click", lengthHandler);
function lengthHandler(event){
  const lengthId = event.target.id;
  closeMarker();
  closeInfoWindow();
  radius = lengthId;
  setting();
  async function categoryHandler(event) {
  const categoryId = event.target.id;
  const category = categoryMap[categoryId];

  // 데이터 분류
  let categorizedDataSet = await getDataSet(category);


  // 기존 마커 삭제
  closeMarker();

  // 기존 인포윈도우 닫기
  closeInfoWindow();

  setMap(categorizedDataSet);
}
  var s = document.getElementById("length-info");
  s.innerHTML=radius/1000+"km이내의 가맹점을 조회합니다.";
}

async function setting(){
  try{
    const dataSet = await getDataSet();
    setMap(dataSet);

  }catch(error){
    console.log(error);

  }
  

}
setting();








