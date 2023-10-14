package com.ducnhat.btliot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ducnhat.btliot.model.Data;

@Repository
public interface DataRepository extends JpaRepository<Data, Integer>{

}
