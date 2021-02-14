package com.application.springboot.repository.message;

import com.application.springboot.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {
}
