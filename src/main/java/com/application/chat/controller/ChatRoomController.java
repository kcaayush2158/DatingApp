package com.application.chat.controller;

import com.application.chat.model.ChatRoom;
import com.application.chat.model.Conversation;
import com.application.chat.service.ChatRoomService;
import com.application.springboot.model.User;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatRoomController {
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/chatroom/create")
    public String createChatRoom(@ModelAttribute("chatRoom") ChatRoom chatRoom, @RequestParam("chatRoomName") String chatRoomName, @RequestParam("password") String password, @RequestParam("roomDescription") String roomDescription, @RequestParam("roomType") String roomType, Model model, Principal principal) throws Exception {

        User user = userService.findExistingEmail(principal.getName());
        ChatRoom existedChatRoom = chatRoomService.findByChatRoomName(chatRoomName);

        if (existedChatRoom != null) {
            if (existedChatRoom.getChatRoomName().equals(chatRoomName)) {

                    //updates the chatroom by the principal
                if(existedChatRoom.getCreatedBy().getEmail().equals(principal.getName())){
                    System.out.println(existedChatRoom.getCreatedBy().getEmail());
                    System.out.println(principal.getName());
                    ChatRoom chatroom = chatRoomService.findChatRoomByChatRoomId(existedChatRoom.getChatRoomId());
                    System.out.println(chatroom);
                    chatRoomService.updateChatRoom(chatRoomName, roomDescription, roomType, new Date(),existedChatRoom.getChatRoomId());

                }else{
                    throw new Exception("You are unable to change the room");
                }


            }
        }

        Conversation conversation = new Conversation();
        InetAddress ip = InetAddress.getLocalHost();

        chatRoom.setChatRoomName(chatRoomName);
        chatRoom.setType(roomType);
        chatRoom.setChatRoomId(UUID.randomUUID().toString());
        chatRoom.setCreatedBy(user);
        chatRoom.setPassword(bCryptPasswordEncoder.encode(password));
        chatRoom.setChatRoomDescription(roomDescription);
        chatRoom.setCreatedTime(new Date());

        chatRoomService.createChatRoom(chatRoom);

        return "redirect:/chatroom";

    }

    @PostMapping("/chatroom/{chatRoomId}/update")
    public String updateChatRooms(ChatRoom chatRoom,@PathVariable("chatRoomId") String ChatRoomId ,@RequestParam("chatRoomName") String chatRoomName, @RequestParam("password") String password, @RequestParam("roomDescription") String roomDescription, @RequestParam("roomType") String roomType, Model model, Principal principal) throws Exception {

        User user = userService.findExistingEmail(principal.getName());
        ChatRoom existedChatRoom = chatRoomService.findChatRoomByChatRoomId(ChatRoomId);

                if (existedChatRoom.getCreatedBy().getEmail().equals(principal.getName())) {
                    Conversation conversation = new Conversation();
                    InetAddress ip = InetAddress.getLocalHost();

                    chatRoom.setChatRoomName(chatRoomName);
                    chatRoom.setType(roomType);
                    chatRoom.setCreatedBy(user);
                    chatRoom.setPassword(bCryptPasswordEncoder.encode(password));
                    chatRoom.setChatRoomDescription(roomDescription);
                    chatRoom.setCreatedTime(new Date());
                    chatRoomService.updateChatRoom(chatRoomName, roomDescription, roomType, new Date(), existedChatRoom.getChatRoomId());
                    return "redirect:/chatroom";

                } else {
                    throw new Exception("Unable To Update Room");
                }

    }

    @GetMapping("/chatroom/search/{name}")
    @ResponseBody
    public List<ChatRoom>  searchChatRooms(@PathVariable("name") String name) {
        List<ChatRoom> chatRooms = chatRoomService.searchChatRooms(name);
        return chatRooms;

    }


    @GetMapping("/chatroom/{ChatroomId}")
    public @ResponseBody ChatRoom rooms(@PathVariable("ChatroomId") String ChatroomId, Model model) {
        return chatRoomService.findChatRoomByChatRoomId(ChatroomId);
    }

    @PostMapping("/chatroom/{chatRoomId}/delete")
    @ResponseBody
    public int deleteChatRoom(@PathVariable("chatRoomId") String chatRoomId) {
         return chatRoomService.deleteChatRoom(chatRoomId);
    }



}
