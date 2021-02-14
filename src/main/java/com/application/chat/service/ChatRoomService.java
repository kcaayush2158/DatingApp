package com.application.chat.service;

import com.application.chat.model.ChatRoom;
import com.application.chat.repository.ChatroomRepository;
import com.application.springboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChatRoomService {

    @Autowired
    private ChatroomRepository chatroomRepository;

    public void createChatRoom(ChatRoom chatRoom){
        chatroomRepository.save(chatRoom);
    }

    public List<ChatRoom> findAllChatRoom( ){
        return chatroomRepository.findAll();
    }

    public List<ChatRoom> searchChatRooms(String name){
        return  chatroomRepository.findChatRoomByChatRoomNameStartingWith(name);
    }
    public ChatRoom findByChatRoomName(String name){
        return  chatroomRepository.findByChatRoomName(name);
    }

    public ChatRoom findChatRoomByChatRoomId(String chatRoomId) {
        return chatroomRepository.findChatRoomByChatRoomId(chatRoomId);
    }

    public void updateChatRoom(String chatRoomName, String chatRoomDescription, String chatRoomType, Date createdTime,String chatRoomId){
        chatroomRepository.updateChatRoom(chatRoomName, chatRoomDescription, chatRoomType, createdTime,chatRoomId);
    }
    public int deleteChatRoom(String chatRoomId){
        return chatroomRepository.deleteChatRoomByChatRoomId(chatRoomId);
    }
    public List<ChatRoom> findChatRoomCreatedBy(User user){
        return chatroomRepository.findChatRoomsByCreatedBy(user);
    }

    public int countAllChatroom(User user){
        return chatroomRepository.countAllByCreatedBy( user);
    }


}
