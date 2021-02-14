package com.application.springboot.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.application.springboot.model.AboutMe;
import com.application.springboot.model.Photos;
import com.application.springboot.model.User;
import com.application.springboot.model.Visits;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.repository.AboutMeRepository;
import com.application.springboot.repository.UserRepository;
import com.application.springboot.service.*;
import com.application.springboot.service.LikeService.LikesService;
import com.application.springboot.service.photo.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Controller
public class ProfileController {

    @Autowired
    private AboutMeService aboutMeService;
    @Autowired
    private AmazonService amazonService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AboutMeRepository aboutMeRepository;

    @Autowired
    private SettingService settingService;

    private AmazonS3 s3client;

    @Value("${bucketName}")
    private String bucketName;
    @Value("${endpointUrl}")
    private String endPointurl;
    @Value("${ACCESS-KEY}")
    private String accessKey;
    @Value("${SECRET-KEY}")
    private String secretKey;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private PhotoService photoService;
    @Autowired
    private VisitService visitService;
    @Autowired
    private LikesService likesService;
    /*
    Working correctly ,
    Repo:-
    * Page userprofile page
    * */
    @GetMapping(value = "/user/profile/{username}")
    public ModelAndView showUserProfiles(@PathVariable("username") String username, Model model,  Principal principal) {
        ModelAndView modelAndView = new ModelAndView("userprofile");
        User user = userService.getAllWithUsername(username);

        User currentloginInformation = userService.findExistingEmail(principal.getName());

        //gets the total no of photos
        model.addAttribute("totalPhoto",photoService.countAllPhotos(user));
        model.addAttribute("totalLikes",likesService.countTotalLikes(currentloginInformation,user));
        // save the notification if the principal visit other profiles
        Notification notification = new Notification();
        notification.setUserSender(principal.getName());
        notification.setUserReceiver(user.getEmail());
        notification.setDatetime_added(new Date());
        notification.setUser(currentloginInformation);
        model.addAttribute("userSender",currentloginInformation);

        //gets the logged in user photo
        model.addAttribute("userPhoto",photoService.showAllPhotos(user));

        User visitedUsers =  userService.findByUsername(username);


        Visits visits = new Visits();
        visits.setStatus(true);
        visits.setVisitedUser(visitedUsers);
        visits.setReceivedUser(currentloginInformation);
        visitService.saveVisits(visits);

        notification.setMessage(currentloginInformation.getUsername() + " "+ " has visited your profile");

        //gets other similar users by its genders
        model.addAttribute("othersUsers",userService.findOthersSimilarUsers(user.getAboutMe().getGender()));


        if (!user.getEmail().equals(currentloginInformation.getEmail())) {
            notificationService.saveUserVisit(notification);
        }

        model.addAttribute("currentUser", currentloginInformation);
        User result = userService.findByUsername(username);

        model.addAttribute("users", result);
        model.addAttribute("aboutme", user);
        return modelAndView;
    }

//    @PostMapping("/user/profile/upload/photo")
//    public String uploadPhoto(@RequestPart(value = "file") MultipartFile multipartFile, Principal principal,Model model,Photos photos){
//         amazonService.uploadUserImages(multipartFile,principal);
//         photos.setPhotoUrl(multipartFile.getName() );
//         return "redirect:/profile";
//    }



    /* 3.
       Controller:
       Page: UserProfile
      Find the about me information from the current username
      Status:working
  */
    @GetMapping("/profile")
    public String myProfile(Model model, Principal principal) {
        User existingUser = userService.findExistingEmail(principal.getName());
        model.addAttribute("totalPhotos",photoService.countAllPhotos(existingUser));
        model.addAttribute("userPhoto",photoService.showAllPhotos(existingUser)) ;
        model.addAttribute("users", existingUser);
        model.addAttribute("totalViews",notificationService.getTotalProfileViews(principal.getName()));
    return "profile";
    }


    @PostMapping("/aboutme/save")
    public String saveUserAboutMe(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("liveIn") String livein,
            @RequestParam("age") int age,
            @RequestParam("bio") String bio,
            @RequestParam("drink") String drink,
            @RequestParam("bodyType") String bodyType,
            @RequestParam("education") String education,
            @RequestParam("eyes") String eyes,
            @RequestParam("gender") String gender,
            @RequestParam("country") String country,
            @RequestParam("hair") String hair,
            @RequestParam("haveKids") String havekids,
            @RequestParam("height") String height,
            @RequestParam("known") String known,
            @RequestParam("languages") String languages,
            @RequestParam("lookingFor") String lookingFor,
            @RequestParam("relationship") String relationship,
            @RequestParam("smoke") String smoke,
            @RequestParam("workAs") String workAs,

            Principal principal, AboutMe aboutMe,
            Model model

    ) {
        User user = userService.getAllByEmail(principal.getName());
        user.setFirstName(firstName);
        user.setLastName(lastName);
        aboutMe.setAge(age);
        aboutMe.setBodyType(bodyType);
        aboutMe.setDrink(drink);
        aboutMe.setLanguages(languages);
        aboutMe.setCountry(country);
        aboutMe.setRelationship(relationship);
        aboutMe.setWorkAs(workAs);
        aboutMe.setEducation(education);
        aboutMe.setGender(gender);
        aboutMe.setHaveKids(havekids);
        aboutMe.setKnown(known);
        aboutMe.setLookingFor(lookingFor);
        aboutMe.setBodyType(bodyType);
        aboutMe.setEyes(eyes);
        aboutMe.setHeight(height);
        aboutMe.setLiveIn(livein);
        aboutMe.setHair(hair);
        aboutMe.setSmoke(smoke);
        aboutMe.setDrink(drink);
        user.setAboutMe(aboutMe);
        model.addAttribute("users", user);
        userService.saveUser(user);
        aboutMeRepository.updateAboutMe(aboutMe, user.getId());
        return "redirect:/profile";
    }

    //search the user in the nav
    // @param
    @GetMapping("/search/user")
    public String searchUser(@RequestParam("fromAge") int fromAge, @RequestParam("toAge") int toAge, @RequestParam("gender") String gender,@RequestParam("country") String country,Model model,Principal principal) {
        List<User> results = userService.searchUserProfile(gender,fromAge,toAge,country );
        int totalSearchedUser = userService.countUserProfile(gender,fromAge,toAge,country);
        int totalUser = userService.countTotalUser(principal.getName());
     for (User re: results){
         model.addAttribute("totalSearchedUser",totalSearchedUser);
         model.addAttribute("message", "Search Results");
         model.addAttribute("users", results);
         model.addAttribute("totalUsers",totalUser);
         model.addAttribute("message", "Search Results , "+ totalSearchedUser);
         return "search";
     }
        model.addAttribute("result", "User doesn't found");
        model.addAttribute("message", "Search Results , "+ totalSearchedUser);
        return "search";
    }



    @GetMapping("/list/bucket")
    public @ResponseBody
    String listAllBucketFiles(Model model, Principal principal ){
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                .withBucketName(bucketName)
                .withPrefix(principal.getName()+"/").withDelimiter("/");

        ObjectListing objects = s3client.listObjects(listObjectsRequest);

            List<S3ObjectSummary> summaries = objects.getObjectSummaries();

            for (S3ObjectSummary item : summaries) {
                System.out.println(" -> " + item.getKey() + "  " + "(size = " + item.getSize()/1024 + " KB)");

            }
//                System.out.println("https://user-photo-videos.s3.amazonaws.com/" + item.getKey()+ principal.getName());
//                model.addAttribute("photos","https://user-photo-videos.s3.amazonaws.com/" + item.getKey()+ principal.getName());
        return "";
    }







}
