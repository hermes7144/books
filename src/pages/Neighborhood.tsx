import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useNavigate } from 'react-router-dom';
import { onUserStateChange } from '../api/firebase';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function Neighborhood() {
  const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
  const { location } = useGeoLocation(geolocationOptions);
  const mapRef = useRef<any>();
  const navigate = useNavigate();

  const [neighborhood, setNeiborhood] = useState('');

  const getNeighborhood = useCallback((longitude: any, latitude: any) => {
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.region_3depth_name;
        setNeiborhood(address);
      }
    };
    geocoder.coord2Address(longitude, latitude, callback);
  }, []);

  useEffect(() => {
    location && getNeighborhood(location.longitude, location.latitude);
  }, [getNeighborhood, location]);

  async function handleSearch() {
    const map = mapRef.current;

    getNeighborhood(map.getCenter().getLng(), map.getCenter().getLat());
  }

  async function handleSubmit() {
    navigate('/', { state: { status: 'success' } });
  }

  return (
    <div className='p-4 h-[calc(100vh_-_130px)]'>
      <Map
        center={{
          lat: location?.latitude ? location.latitude : 33,
          lng: location?.longitude ? location.longitude : 33,
        }}
        style={{ width: '100%', height: '100%' }}
        level={3}
        ref={mapRef}
      />
      <section className='mt-5 flex justify-between items-center'>
        <article className='flex gap-2 text-lg'>
          <p className='font-semibold'>내 동네 설정</p>
          <span className='text-brand font-bold'>{neighborhood}</span>
        </article>
        <article className='flex gap-4'></article>
      </section>
    </div>
  );
}
