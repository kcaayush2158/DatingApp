package com.application.springboot.service.message;

import org.springframework.stereotype.Service;

@Service
public class MessageService {
//
//    private SimpMessageSendingOperations sender;
//
//    @Autowired
//    private MessageRepository messageRepository;
//
//    private User user;
//
//    public MessageService(SimpMessageSendingOperations sender, MessageRepository messageRepository){
//        this.sender = sender;
//        this.messageRepository = messageRepository;
//    }
//
//    public void writeMessage(Message message){
//        message.setId(user.getId());
//        message.setCreationDateTime(new Date());
//        message.setUserName(user.getUsername());
//    }
//    @Scheduled(fixedRate = 10000)
//    private void recive(){
//        List<Message> messages = messageRepository.findAll();
//        if (!messages.isEmpty()) {
//            for (Message message: messages) {
//                sender.convertAndSend("/topic/message", message);
//            }
//        }
//    }
//    public String isUniqueUserName(String username) {
//        return username;
//    }
//
//    public long getChatCount() {
//        return messageRepository.count();
//    }
//
//    public boolean isUserStillValid(String username) {
//        return true;
//    }
//
//    public List<String> getAllUsers() {
//        return new ArrayList<String>();
//    }
}
