package com.application.chat.service;

import com.application.chat.model.PrivateChatMessage;
import com.application.chat.repository.PrivateChatMessageRepository;
import com.application.springboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateMessageService {

    @Autowired
    private PrivateChatMessageRepository privateChatMessageRepository;


    public List<PrivateChatMessage> getAllUsers(){
        return privateChatMessageRepository.findAll();
    }

    public List<PrivateChatMessage> getAllMessagesBySender(User sender){
        return privateChatMessageRepository.findPrivateChatMessagesBySender(sender);
    }
    public int countUnreadMessages(User receiver,User sender,boolean status){
        return privateChatMessageRepository.countPrivateChatMessagesByReceiverAndSenderAndConversation_Status(receiver,sender,status);
    }

    public void deleteUserMessage(int id){
         privateChatMessageRepository.deleteById(id);
    }

    public PrivateChatMessage save(PrivateChatMessage privateChatMessage) {
        return privateChatMessageRepository.save(privateChatMessage);
    }
    public List<PrivateChatMessage> searchUser(String username){
        return  privateChatMessageRepository.getPrivateChatMessagesByReceiver_UsernameIsLike(username);
    }

    public List<PrivateChatMessage> getSenderAndReceiverMessages(int senderId,int receiverId){
        return privateChatMessageRepository.getPrivateChatMessagesBySender_IdAndReceiver_Id(senderId,receiverId);
    }
//    public int countAllUnreadMessages(boolean status,String senderEmail,String receiverEmail){
//        return privateChatMessageRepository.countPrivateChatMessagesByStatusAndSender_Email(status,senderEmail,receiverEmail);
//    }

    public int getUnreadMessages(String email,boolean status){
        return privateChatMessageRepository.countPrivateChatMessagesByReceiver_EmailAndConversation_Status(email,status);
    }

    public PrivateChatMessage findUserByMessageId(int id) {
        return privateChatMessageRepository.findPrivateChatMessagesById(id);
    }
}
