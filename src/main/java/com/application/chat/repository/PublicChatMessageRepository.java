package com.application.chat.repository;

import com.application.chat.model.Conversation;
import com.application.chat.model.PublicChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PublicChatMessageRepository extends JpaRepository<PublicChatMessage,Integer> {

    List<PublicChatMessage> getAllByChatRoomId(String chatroomId);

    void deletePublicChatMessageById(int id);

//
//    @Modifying
//    @Query("from PublicChatMessage ")
//    PublicChatMessage savePublicChatMessage(@Param("message")String message, final String chatroomId, Date date, final String ip, final boolean status );
}
