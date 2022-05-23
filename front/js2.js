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

var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.64414481,126.8921129), //지도의 중심좌표. 서울 한가운데
  level: 8, //지도의 레벨(확대, 축소 정도) 3에서 8레벨로 확대
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/

const dataSet =[
 {
  "title": "밀알",
  "phone": "031-975-9166",
  "info": 19,
  "address": "경기도 고양시 일산동구 하늘마을로 57-5, 4층 (중산동)",
  "lat": 37.6835157,
  "long": 126.7881781
 },
 {
  "title": "가람지역아동센터",
  "phone": "031-979-0122",
  "info": 40,
  "address": "경기도 고양시 덕양구 중앙로472번길 85-1 (행신동)",
  "lat": 37.6226355,
  "long": 126.8439592
 },
 {
  "title": "가나안",
  "phone": "031-973-3181",
  "info": 48,
  "address": "경기도 고양시 덕양구 지도로115번길 35 (토당동)",
  "lat": 37.6267743,
  "long": 126.8212945
 },
 {
  "title": "그루터기지역아동센터",
  "phone": "070-7137-8275",
  "info": 29,
  "address": "경기도 고양시 덕양구 토당로42번길 19 (토당동)",
  "lat": 37.6201619,
  "long": 126.8217636
 },
 {
  "title": "꿈나무지역아동센터",
  "phone": "031-967-3006",
  "info": 36,
  "address": "경기도 고양시 덕양구 통일로 797, 3층 (관산동, 벽일빌딩)",
  "lat": 37.6884921,
  "long": 126.8618678
 },
 {
  "title": "다메섹지역아동센터",
  "phone": "031-925-1690",
  "info": 26,
  "address": "경기도 고양시 일산서구 호수로856번길 73-14, 3층 (대화동)",
  "lat": 37.673906,
  "long": 126.7491563
 },
 {
  "title": "둥지",
  "phone": "031-968-8066",
  "info": 42,
  "address": "경기도 고양시 일산동구 고양대로1037번길 17 (식사동)",
  "lat": 37.67246,
  "long": 126.8084541
 },
 {
  "title": "반석지역아동센터",
  "phone": "031-970-8806",
  "info": 29,
  "address": "경기도 고양시 덕양구 용현로 33 (행신동)",
  "lat": 37.6157495,
  "long": 126.8355924
 },
 {
  "title": "사랑샘",
  "phone": "031-923-9109",
  "info": 29,
  "address": "경기도 고양시 일산서구 가좌4로 12-12 (가좌동)",
  "lat": 37.6862344,
  "long": 126.7189126
 },
 {
  "title": "쉴가",
  "phone": "070-4307-0692",
  "info": 29,
  "address": "경기도 고양시 일산서구 성저로42번길 64 (대화동)",
  "lat": 37.6833804,
  "long": 126.7558466
 },
 {
  "title": "아가페",
  "phone": "031-908-9232",
  "info": 29,
  "address": "경기도 고양시 일산동구 경의로 309 (마두동)",
  "lat": 37.6573252,
  "long": 126.7934892
 },
 {
  "title": "어울림",
  "phone": "031-972-6653",
  "info": 29,
  "address": "경기도 고양시 덕양구 행신동 644번지 50호 3층,지하1층",
  "lat": 37.6242993,
  "long": 126.8290372
 },
 {
  "title": "일산",
  "phone": "031-975-3987",
  "info": 29,
  "address": "경기도 고양시 일산서구 고양대로695번길 10 (일산동)",
  "lat": 37.6842908,
  "long": 126.773937
 },
 {
  "title": "주향",
  "phone": "031-902-9183",
  "info": 29,
  "address": "경기도 고양시 일산동구 고풍로 20, 202호 (풍동)",
  "lat": 37.6617931,
  "long": 126.7981006
 },
 {
  "title": "푸른학교반디교실",
  "phone": "031-818-1236",
  "info": 35,
  "address": "경기도 고양시 덕양구 토당로78번길 7-22 (토당동)",
  "lat": 37.6231042,
  "long": 126.8192645
 },
 {
  "title": "한빛지역아동센터",
  "phone": "031-970-5025",
  "info": 29,
  "address": "경기도 고양시 덕양구 토당동  876-7번지 삼윤상가 5층",
  "lat": 37.6203034,
  "long": 126.8259316
 },
 {
  "title": "한사랑푸른",
  "phone": "031-962-8062",
  "info": 29,
  "address": "경기도 고양시 일산동구 성현로 505 (사리현동)",
  "lat": 37.6975166,
  "long": 126.838595
 },
 {
  "title": "행복한",
  "phone": "070-8239-1377",
  "info": 19,
  "address": "경기도 고양시 일산서구 탄중로101번길 36 (덕이동)",
  "lat": 37.6943209,
  "long": 126.7572163
 },
 {
  "title": "강선",
  "phone": "031-914-5130",
  "info": 19,
  "address": "경기도 고양시 일산서구 중앙로 1376, 304-2호\/305-1호 (주엽동, 한양상가)",
  "lat": 37.667321,
  "long": 126.7670186
 },
 {
  "title": "하늘그림",
  "phone": "031-976-0387",
  "info": 34,
  "address": "경기도 고양시 일산서구 원일로21번길 19, 2층 (일산동, 일신건영빌딩)",
  "lat": 37.688011,
  "long": 126.7644589
 },
 {
  "title": "한울타리",
  "phone": "070-7012-6645",
  "info": 25,
  "address": "경기도 고양시 일산서구 장자길118번길 54 (덕이동)",
  "lat": 37.701878,
  "long": 126.7436862
 },
 {
  "title": "꿈틀이지역아동센터",
  "phone": "031-906-1033",
  "info": 19,
  "address": "경기도 고양시 일산동구 산두로109번길 19 (정발산동)",
  "lat": 37.6670223,
  "long": 126.7850408
 },
 {
  "title": "꿈쟁이",
  "phone": "070-7834-6186",
  "info": 19,
  "address": "경기도 고양시 일산서구 주엽로 134, 5층 511호 (주엽동)",
  "lat": 37.6706274,
  "long": 126.7580992
 },
 {
  "title": "원당제일",
  "phone": "031-964-1988",
  "info": 49,
  "address": "경기도 고양시 덕양구 호국로790번길 87 (성사동)",
  "lat": 37.6545794,
  "long": 126.8406161
 },
 {
  "title": "글로리아지역아동센터",
  "phone": "031-938-7942",
  "info": 49,
  "address": "경기도 고양시 덕양구 호국로716번길 21-7 (성사동)",
  "lat": 37.6512445,
  "long": 126.8332578
 },
 {
  "title": "늘푸른교실",
  "phone": "031-964-9923",
  "info": 49,
  "address": "경기도 고양시 덕양구 대양로285번길 73 (고양동)",
  "lat": 37.7042686,
  "long": 126.8969232
 },
 {
  "title": "동녘",
  "phone": "031-903-2760",
  "info": 40,
  "address": "경기도 고양시 일산동구 중앙로 1123, 1층 160호 (백석동, 흰돌마을)",
  "lat": 37.6471043,
  "long": 126.7814843
 },
 {
  "title": "맑은샘",
  "phone": "031-977-4454",
  "info": 29,
  "address": "경기도 고양시 일산동구 고봉로658번길 13 (성석동)",
  "lat": 37.7154578,
  "long": 126.7898212
 },
 {
  "title": "LH행복꿈터삼송지역아동센터",
  "phone": "070-5111-9923",
  "info": 19,
  "address": "경기도 고양시 덕양구 오금2로 26 (신원동, 신원마을 2단지 주민복지관 2층)",
  "lat": 37.666324,
  "long": 126.8915368
 },
 {
  "title": "신성",
  "phone": "031-904-9336",
  "info": 19,
  "address": "경기도 고양시 일산동구 백석동 1344",
  "lat": 37.6408829,
  "long": 126.7837915
 },
 {
  "title": "아가페21",
  "phone": "031-977-1004",
  "info": 35,
  "address": "경기도 고양시 일산서구 일청로91번길 82, 3층 301호 (일산동)",
  "lat": 37.6910409,
  "long": 126.7702882
 },
 {
  "title": "열매지역아동센터",
  "phone": "031-905-5133",
  "info": 19,
  "address": "경기도 고양시 일산동구 백석로 153, 지하1층 (백석동)",
  "lat": 37.651603,
  "long": 126.7929047
 },
 {
  "title": "푸른우리",
  "phone": "031-905-3400",
  "info": 29,
  "address": "경기도 고양시 일산동구 백석동 1343",
  "lat": 37.6422192,
  "long": 126.7852945
 },
 {
  "title": "정발신성",
  "phone": "031-916-8610",
  "info": 29,
  "address": "경기도 고양시 일산동구 대산로 20 (정발산동)",
  "lat": 37.6700742,
  "long": 126.7742414
 },
 {
  "title": "새꿈터",
  "phone": "031-911-0611",
  "info": 24,
  "address": "경기도 고양시 일산동구 산두로229번길 29,2층(정발산동)",
  "lat": 37.6746859,
  "long": 126.7782966
 }
];
/*
**********************************************************
3. 여러개 마커 찍기
  * 주소 - 좌표 변환
https://apis.map.kakao.com/web/sample/multipleMarkerImage/ (여러개 마커)
https://apis.map.kakao.com/web/sample/addr2coord/ (주소로 장소 표시하기)
*/

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
        <h1 class="title">${data.title}</h1>
        <img
          src="resize_어린이집.png"
          class="infowindow-img"
        />
        <div class="body">
        <a href="https://map.kakao.com/link/to/${data.title},${data.lat},${data.long}" class="infowindow-btn" target="_blank">길찾기</a>
        <p class="infowindow-address">${data.address}</p>
        <p class ="infowindow-phone">전화번호: ${data.phone}</p>   
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


setMap(dataSet);

