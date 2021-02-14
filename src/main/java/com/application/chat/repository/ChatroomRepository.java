package com.application.chat.repository;

import com.application.chat.model.ChatRoom;
import com.application.springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface ChatroomRepository extends JpaRepository<ChatRoom,Integer> {

    List<ChatRoom> findAll();

    List<ChatRoom> findChatRoomByChatRoomNameStartingWith(String name);

    @Query("from ChatRoom c where  c.chatRoomName=:name")
    ChatRoom findByChatRoomName(@Param("name") String name);

    ChatRoom findChatRoomByChatRoomId(String chatRoomId);

    @Transactional
    @Modifying
    @Query("DELETE FROM ChatRoom c where c.chatRoomId=:chatRoomId")
    int deleteChatRoomByChatRoomId(@Param("chatRoomId") String chatRoomId);

    List<ChatRoom> findChatRoomsByCreatedBy(User user);

    int countAllByCreatedBy(User user);

    @Transactional
    @Modifying
    @Query("update ChatRoom c set c.chatRoomName = :chatRoomName , c.chatRoomDescription = :chatRoomDescription , c.type= :chatRoomType ,c.createdTime= :createdTime where c.chatRoomId =:chatRoomId")
    void updateChatRoom(@Param("chatRoomName")String chatRoomName, @Param("chatRoomDescription")String chatRoomDescription, @Param("chatRoomType")String chatRoomType, @Param("createdTime") Date createdTime,@Param("chatRoomId")String chatRoomId);
}
