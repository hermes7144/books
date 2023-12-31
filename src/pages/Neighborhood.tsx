import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { writeNeighborhood, onUserStateChange } from '../api/firebase';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function Neighborhood() {
  const { location } = useGeoLocation(geolocationOptions);
  const navigate = useNavigate();
  const [neighborhood, setNeighborhood] = useState('');
  const [position, setPosition] = useState({ lng: NaN, lat: NaN });
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    location && getNeighborhood();

    function getNeighborhood() {
      if (isNaN(position.lng)) setPosition({ lng: location?.longitude, lat: location?.latitude });

      const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].address.region_3depth_name;
          setNeighborhood(address);
        }
      };
      geocoder.coord2Address(position.lng, position.lat, callback);
    }
  }, [location, position]);

  async function handleSubmit() {
    await writeNeighborhood(user, neighborhood);

    onUserStateChange(setUser);
    navigate('/', { state: { status: 'success' } });
  }

  return (
    <div className='p-4'>
      <div className='h-[600px] md:h-[740px]'>
        <Map
          center={{
            lat: location?.latitude ? location.latitude : 33,
            lng: location?.longitude ? location.longitude : 33,
          }}
          style={{ width: '100%', height: '100%' }}
          level={3}
          onClick={(_t, mouseEvent) =>
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }>
          <MapMarker position={{ lng: position.lng, lat: position.lat }} />
        </Map>
      </div>
      <section className='mt-5 '>
        <article className='flex gap-2 text-lg'>
          <p>마커를 움직여 동네를 설정해주세요.</p>
        </article>
        <article className='flex justify-between items'>
          <div className='flex gap-4'>
            <p className='font-semibold'>내 동네</p>
            <span className='text-brand font-bold'>{neighborhood}</span>
          </div>
          <Button text='동네 저장하기' onClick={handleSubmit} />
        </article>
      </section>
    </div>
  );
}
