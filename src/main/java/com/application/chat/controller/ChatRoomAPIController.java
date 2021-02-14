package com.application.chat.controller;
import com.application.chat.model.ChatRoom;
import com.application.chat.model.ShoutOut;
import com.application.chat.service.ChatRoomService;
import com.application.chat.service.ShoutOutService;
import com.application.springboot.model.User;
import com.application.springboot.service.NotificationService;
import com.application.springboot.service.UserService;
import com.pusher.rest.Pusher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.Principal;
import java.util.*;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ChatRoomAPIController {

    @Autowired
    private SessionRegistry sessionRegistry;
    @Autowired
    public ChatRoomService chatRoomService;
    @Autowired
    public NotificationService notificationService;
    @Autowired
    public UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ShoutOutService shoutOutService;



    @GetMapping("/chatroom")
    public String chatRoom(Model model, Principal principal){
        model.addAttribute("activeuser",  sessionRegistry.getAllPrincipals().size());
        return "/chatroom/chatroom";
    }
    @GetMapping("/api/my/chatroom")
    public @ResponseBody List<ChatRoom> myChatRooms(Model model, Principal principal){
        User findUser = userService.findExistingEmail(principal.getName());
       return  chatRoomService.findChatRoomCreatedBy(findUser);
    }


    @GetMapping("/api/chatrooms/all")
    public @ResponseBody  List<ChatRoom> chatRooms() {
        return chatRoomService.findAllChatRoom();
    }

    //counts all the room in the principal chatroom
    @GetMapping("/api/chatroom/my/count")
    public @ResponseBody int countsAllThePrincipalChatroom(Principal principal){
        User user = userService.findExistingEmail(principal.getName());
        return  chatRoomService.countAllChatroom(user);
    }

    @GetMapping("/chatroom/public/{chatRoomId}")
     public String chatRoom(@PathVariable("chatRoomId")String chatRoomId,  Model model, HttpServletRequest request, HttpSession httpSession){
        ChatRoom chatRoom = chatRoomService.findChatRoomByChatRoomId(chatRoomId);
        System.out.println(chatRoom);
        Pusher pusher = new Pusher("942339", "fe6ae4d627b4ab84c8d9", "24772a863476b96756cc");
        pusher.setCluster("ap2");
        pusher.setEncrypted(true);
        pusher.trigger("public-room", chatRoomId, chatRoom);

          model.addAttribute("chatRoom",chatRoom);
        return "/chatroom/rooms";
    }


         

    @PostMapping("/chatroom/private/{chatRoomId}")
    public  String privateChatroom(@PathVariable("chatRoomId")String chatRoomId, @RequestParam("password-chatroom") String password,Principal principal, Model model, HttpServletRequest request, HttpSession httpSession){

        ChatRoom chatRoom = chatRoomService.findChatRoomByChatRoomId(chatRoomId);


            if(bCryptPasswordEncoder.matches(password,chatRoom.getPassword())){

                httpSession.setAttribute("username",principal.getName());
                model.addAttribute("chatRoom",chatRoom);

                User users= userService.findExistingEmail(principal.getName());
                model.addAttribute("users",users);

                return "/chatroom/rooms";
            }
            model.addAttribute("error","Invalid Password ");
            return "/chatroom/chatroom";
    }

    @GetMapping("/api/chatrooms/shoutout/all")
    public @ResponseBody  List<ShoutOut> getAllShoutOuts(){
        return shoutOutService.getAllShoutOuts();
    }

    @PostMapping("/api/chatrooms/shoutout/{id}/delete")
    public void deleteShoutOuts(int id){
          shoutOutService.deleteShoutOuts(id);
    }

    @PostMapping("/api/chatrooms/shoutout/save")
    public ShoutOut saveShoutOuts(@RequestParam("message") String message, ShoutOut shoutOut,Principal principal) throws UnknownHostException {
        InetAddress myIP=InetAddress.getLocalHost();
        User user = userService.findExistingEmail(principal.getName());
        shoutOut.setIp(myIP.getHostAddress());
        shoutOut.setMessage(message);
        shoutOut.setUser(user);


        return shoutOutService.saveShoutOuts(shoutOut);
    }


}
