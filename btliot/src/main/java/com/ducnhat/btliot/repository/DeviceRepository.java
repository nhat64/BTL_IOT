package com.ducnhat.btliot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ducnhat.btliot.model.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
	
}
