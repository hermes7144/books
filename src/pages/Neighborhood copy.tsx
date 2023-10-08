/*global kakao*/
import { useRef, useState, useEffect } from 'react';
import { Map, MapMarker, MapTypeControl } from 'react-kakao-maps-sdk';
import { useGeoLocation } from '../hooks/useGeoLocation';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

// 주소-좌표 변환 객체를 생성합니다
export default function Neighborhood() {
  const { kakao } = window;
  var geocoder = new kakao.maps.services.Geocoder();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [info, setInfo] = useState<string>('');
  const [position, setPosition] = useState<any>();
  const { location } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    setPosition({ lat: location.latitude, lng: location.longitude });
  }, [location]);

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    // 지도의 현재 레벨을 얻어옵니다
    const level = map.getLevel();

    // 지도타입을 얻어옵니다
    const mapTypeId = map.getMapTypeId();

    // 지도의 현재 영역을 얻어옵니다
    const bounds = map.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();

    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    // const boundsStr = bounds.toString()

    // let message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
    // message += '경도 ' + center.getLng() + ' 이고 <br>';
    // message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
    // message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
    // message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
    // message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
    // setInfo(message);

    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.region_3depth_name;
        setInfo(address);
      }
    };
    geocoder.coord2Address(center.getLng(), center.getLat(), callback);
  };

  return (
    <Map // 지도를 표시할 Container
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '600px',
      }}
      level={3} // 지도의 확대 레벨
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }>
      <MapTypeControl position={'TOPRIGHT'} />
      <button id='getInfoBtn' onClick={getInfo}>
        맵정보 가져오기
      </button>
      <p
        id='info'
        dangerouslySetInnerHTML={{
          __html: info,
        }}
      />
      {/* {position && <MapMarker position={position} />} */}
    </Map>
  );
}
