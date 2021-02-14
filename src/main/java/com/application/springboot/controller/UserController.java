package com.application.springboot.controller;

import com.application.springboot.model.AboutMe;
import com.application.springboot.model.Role;
import com.application.springboot.model.User;
import com.application.springboot.model.userstore.ActiveUserStore;
import com.application.springboot.repository.UserRepository;
import com.application.springboot.service.AboutMeService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Controller
public class UserController {
    @Autowired
    ActiveUserStore activeUserStore;
    @Autowired
    public UserService userService;
    @Autowired
    public UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private AboutMeService aboutMeService;

    /*
     *  Used to register the user
     * status: working correctly
     * */
    @PostMapping("/signup")
    public String registerUser( User user,@RequestParam("username") String username, @RequestParam("lastName") String lastName, @RequestParam("bio") String bio, @RequestParam("interests") String interests, @RequestParam String firstName, @RequestParam("age") int age , @RequestParam("password") String password, @RequestParam("country") String country , @RequestParam("known") String known, @RequestParam("lookingFor") String lookingFor, @RequestParam("height") String height, @RequestParam String liveIn, @RequestParam String haveKids, @RequestParam("email") String email, @RequestParam String gender, @RequestParam String bodyType, @RequestParam String drink, @RequestParam String education, @RequestParam String eyes, @RequestParam String hair, @RequestParam String languages, @RequestParam String relationship, @RequestParam String smoke, @RequestParam String workAs, Model model) {
//                if(bindingResult.hasErrors()){
//                    return "signup";
//                }
                 try {
                     User existingEmail = userService.findExistingEmail(email);
                     if(existingEmail != null ){
                         if(email.equals(existingEmail.getEmail())){
                             model.addAttribute("error","User is already existed");
                             return  "signup";
                         }
                     }
                 }catch (NullPointerException ex){
                     ex.printStackTrace();
                 }
//
//            ConnectionFactory connectionFactory = new ConnectionFactory();
//            try {
//                Connection connection = connectionFactory.newConnection();
//                Channel channel = connection.createChannel();
//                channel.queueDeclare(username, false, false, false, null);
//
//            } catch (Exception ex) {
//                System.out.println(ex.getMessage());
//
//            }

        user.setRoles(Collections.singletonList(new Role("USER")));
        user.setUsername(username);
        user.setCreatedDate(new Date());

        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setActive(true);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);

        AboutMe aboutMe =new AboutMe();
        aboutMe.setAge(age);
        aboutMe.setCountry(country);
        aboutMe.setBodyType(bodyType);
        aboutMe.setDrink(drink);
        aboutMe.setEducation(education);
        aboutMe.setLiveIn(liveIn);
        aboutMe.setEyes(eyes);
        aboutMe.setGender(gender);
        aboutMe.setKnown(known);
        aboutMe.setHaveKids(haveKids);
        aboutMe.setHair(hair);
        aboutMe.setHeight(height);
       aboutMe.setInterests(interests);
        aboutMe.setLanguages(languages);
        aboutMe.setLiveIn(liveIn);
        aboutMe.setLookingFor(lookingFor);
        aboutMe.setRelationship(relationship);
        aboutMe.setSmoke(smoke);
        aboutMe.setWorkAs(workAs);
        aboutMe.setBio(bio);
        aboutMe.setKnown(known);
        user.setAboutMe(aboutMe);
        System.out.println(aboutMe);
         userService.saveUser(user);
        model.addAttribute("user",user);
        return "login";

    }
    @GetMapping("/visits")
    public String visitsPage(Model model){
        return "visits";
    }

    @PostMapping("/user/aboutme/save")
    public String saveUserAboutMe(@Valid @ModelAttribute AboutMe aboutMe, Model model, Principal principal){
       User user = userService.getAllByEmail(principal.getName());
        aboutMe.setAge(aboutMe.getAge());
        aboutMe.setLookingFor(aboutMe.getLookingFor());
        aboutMe.setBio(aboutMe.getBio());
        aboutMe.setBodyType(aboutMe.getBodyType());
        aboutMe.setCountry(aboutMe.getCountry());
        aboutMe.setDrink(aboutMe.getDrink());
        aboutMe.setEducation(aboutMe.getEducation());
        aboutMe.setGender(aboutMe.getGender());
        aboutMe.setHaveKids(aboutMe.getHaveKids());
        aboutMe.setWorkAs(aboutMe.getWorkAs());
        aboutMe.setSmoke(aboutMe.getSmoke());
        aboutMe.setRelationship(aboutMe.getRelationship());
        aboutMe.setEyes(aboutMe.getEyes());
        user.setAboutMe(aboutMe);
        model.addAttribute("aboutMe",aboutMe);
        userService.saveUser(user);
        aboutMeService.saveAboutMe(aboutMe);
        return "redirect:/";
    }

    @GetMapping("/aboutme")
    public String aboutme (Model model,AboutMe aboutMe){
         model.addAttribute("aboutme",aboutMe);
        return "aboutme" ;
    }

    //Search the user username : status working fine
    @GetMapping("/search")
    public String searchUserByUsername(@RequestParam("username") String username, Model model,Principal principal){
        List<User> user =  userRepository.searchByUsername(username);
        int totalUser= userService.countTotalUser(username);
        if(user !=null){
            model.addAttribute("message","Search Results "+ totalUser );
            model.addAttribute("users", user);
            return "search";
        }else{
            model.addAttribute("message","User not found");
        }
        return "search";
    }



}
