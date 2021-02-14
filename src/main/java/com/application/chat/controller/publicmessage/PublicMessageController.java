package com.application.chat.controller.publicmessage;

import com.application.chat.model.PrivateChatMessage;
import com.application.chat.service.PrivateMessageService;
import com.application.springboot.model.User;
import com.application.springboot.service.UserService;
import com.pusher.rest.Pusher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicMessageController {
    @Autowired
    private PrivateMessageService privateChatMessageService;
    @Autowired
    private UserService userService;

//    @GetMapping("/direct/inbox/")
//    public List<PrivateChatMessage> findAllUsers(Principal principal){
//        User user = userService.findExistingEmail(principal.getName());
//        return  privateChatMessageService.findUsersById(user.getId());
//    }

        @PostMapping("/direct/inbox/user/{userId}/send")
        public PrivateChatMessage saveMessage(@PathVariable("userId") int userId, PrivateChatMessage privateChatMessage, @RequestParam("message") final String message, Principal principal, Model model) throws Exception{
        InetAddress myIP=InetAddress.getLocalHost();

        privateChatMessage.setStatus(false);
        privateChatMessage.setReceiver(userService.findExistingEmail(principal.getName()));
       privateChatMessage.setReceiver(userService.findUserById(userId));
        privateChatMessage.setIp(myIP.getHostAddress());



        return privateChatMessageService.save(privateChatMessage);
    }

//    @GetMapping("/count/unread/messages")
//    public int countAllUnreadMessages( Principal principal, Model model){
//            return privateChatMessageService.countAllUnreadMessages(false,principal.getName());
//    }


}
