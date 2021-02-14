//package com.application.springboot.controller.video;
//
//import com.application.springboot.model.User;
//import com.application.springboot.service.UserService;
//import io.openvidu.java.client.OpenVidu;
//import io.openvidu.java.client.OpenViduRole;
//import io.openvidu.java.client.Session;
//import io.openvidu.java.client.TokenOptions;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import javax.servlet.http.HttpSession;
//import java.security.Principal;
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//import java.util.stream.Collector;
//import java.util.stream.Collectors;
//
//@Controller
//public class SessionController {
//    @Autowired
//    private UserService userService;
//
//    private OpenVidu openVidu;
//
//    // Collection to pair session names and OpenVidu Session objects
//    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
//    // Collection to pair session names and tokens (the inner Map pairs tokens and role associated)
//    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
//
//    // URL where our OpenVidu server is listening
//    private String OPENVIDU_URL;
//    // Secret shared with our OpenVidu server
//    private String SECRET;
//
//
//    @GetMapping("/sessions")
//    public void joinSession(@RequestParam("sessionName")String sessionName, Model model, HttpSession httpSession,Principal principal
//    ){
//
//       User roles = userService.getAllWithUsername(principal.getName());
//
//       String role ="PUBLISHER";
//       String  serverData ="{\"serverData\"}:\""+ principal.getName();
//
//
//       TokenOptions tokenOptions= new TokenOptions.Builder().data(serverData).role(OpenViduRole.valueOf(role)).build();
//
//        if (this.mapSessions.get(sessionName) != null) {
//            System.out.println("New session " + sessionName);
//            try {
//
//                // Create a new OpenVidu Session
//                Session session = this.openVidu.createSession();
//                // Generate a new token with the recently created tokenOptions
//                String token = session.generateToken(tokenOptions);
//
//                // Store the session and the token in our collections
//                this.mapSessions.put(sessionName, session);
//                this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
//                this.mapSessionNamesTokens.get(sessionName).put(token, roles.getRoles());
//
//                // Add all the needed attributes to the template
//                model.addAttribute("sessionName", sessionName);
//                model.addAttribute("token", token);
//                model.addAttribute("nickName", clientData);
//                model.addAttribute("userName", httpSession.getAttribute("loggedUser"));
//
//                // Return session.html template
//                return "session";
//
//            } catch (Exception e) {
//                // If error just return dashboard.html template
//                model.addAttribute("username", httpSession.getAttribute("loggedUser"));
//                return "dashboard";
//            }
//
//        }
//
//    }
//
//}
