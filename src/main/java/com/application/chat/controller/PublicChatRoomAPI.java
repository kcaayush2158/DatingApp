package com.application.chat.controller;

import com.application.chat.model.PublicChatMessage;
import com.application.chat.service.PublicChatroomService;
import com.application.springboot.model.User;
import com.application.springboot.service.UserService;
import com.pusher.rest.Pusher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicChatRoomAPI {

    @Autowired
    private PublicChatroomService publicChatroomService;
    @Autowired
    private UserService userService;


        @PostMapping("/chatroom/public/{chatroomId}/save")
    public void savePublicChatRoomMessage(PublicChatMessage publicChatMessage, @RequestParam("message") String message, @PathVariable("chatroomId") final String chatroomId, Principal principal) throws UnknownHostException {
        InetAddress myIP=InetAddress.getLocalHost();
       User user = userService.findExistingEmail(principal.getName());
        publicChatMessage.setDate(new Date());
        publicChatMessage.setMessage(publicChatMessage.getMessage());
        publicChatMessage.setChatRoomId(chatroomId);
        publicChatMessage.setStatus(false);
        publicChatMessage.setType("PUBLIC");
        publicChatMessage.setSender(user);
        publicChatMessage.setIp(myIP.getHostAddress());


        publicChatroomService.savePublicChats(publicChatMessage);

    }

    @GetMapping("/chatroom/public/{chatroomId}/all")
    public List<PublicChatMessage> findAllPublicChats(@PathVariable("chatroomId") final String chatroomId){

        return  publicChatroomService.getAllPublicChats(chatroomId);
    }


}
