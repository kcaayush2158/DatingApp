package com.application.chat.repository;
import com.application.chat.model.ShoutOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShoutOutRepository extends JpaRepository<ShoutOut, Integer> {

    @Modifying
    @Query(value="SELECT * FROM shout_out s ORDER BY s.id desc limit 50",nativeQuery=true)
    List<ShoutOut> getAllShoutOuts();


}
