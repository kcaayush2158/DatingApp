package com.application.chat.repository;

import com.application.chat.model.PrivateChatMessage;
import com.application.springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PrivateChatMessageRepository  extends JpaRepository<PrivateChatMessage,Integer> {


    List<PrivateChatMessage> findPrivateChatMessagesBySender(User sender);

     PrivateChatMessage findPrivateChatMessagesById(int id);
    @Modifying
    @Transactional
    int countPrivateChatMessagesByReceiverAndSenderAndConversation_Status(User receiver,User sender,boolean status);

//    List<PrivateChatMessage> getDistinctBySender_IdOrderBySenderDescId(int id);

    int countPrivateChatMessagesByConversation_StatusAndSender_EmailAndReceiver_Email(boolean status ,String senderEmail,String receiverEmail);

    List<PrivateChatMessage> getPrivateChatMessagesBySender_IdAndReceiver_Id(int senderId, int receiverId);

    List<PrivateChatMessage> getPrivateChatMessagesByReceiver_UsernameIsLike(String username);

    int countPrivateChatMessagesByReceiver_EmailAndConversation_Status(String email,boolean status);

}
