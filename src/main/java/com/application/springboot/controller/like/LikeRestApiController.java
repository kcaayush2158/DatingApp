package com.application.springboot.controller.like;

import com.application.springboot.model.Likes;
import com.application.springboot.model.User;
import com.application.springboot.model.notification.Notification;
import com.application.springboot.service.LikeService.LikesService;
import com.application.springboot.service.NotificationService;
import com.application.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.Like;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class LikeRestApiController {

    @Autowired
    private UserService userService;
    @Autowired
    private LikesService likesService;
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/likes/save")
    public Likes saveLikes(@RequestParam("id") int id, Principal principal) {

        User likedByUser = userService.findExistingEmail(principal.getName());
        User likedToUser = userService.findUserById(id);

      Likes existingUser = likesService.findExistingUser(likedToUser, likedByUser);

        if(existingUser ==null){

            //sends the user notification to the users
            Notification notification = new Notification();
            notification.setMessage(likedByUser.getUsername() + ' ' + "has liked your profile");
            notification.setDatetime_added(new Date());
            notification.setUserSender(principal.getName());
            notification.setStatus(false);
            notification.setUserReceiver(likedToUser.getEmail());
            notificationService.saveUserVisit(notification);
            notification.setUser(likedByUser);

            Likes like = new Likes();
            like.setLikedBy(likedByUser);
            like.setLikedTo(likedToUser);
            like.setStatus(true);

            return likesService.saveLikes(like);
        }else{
            return null;
        }

    }

    @GetMapping("/likes/all")
    public List<Likes> getAllLikedUsers(Principal principal) {
        User loggedInUsers = userService.findExistingEmail(principal.getName());

        return likesService.getLikedUsers(loggedInUsers);
    }

    @GetMapping("/likes/u/all")
    public List<Likes> getAllLikedByPrincipal(Principal principal) {
        User loggedInUsers = userService.findExistingEmail(principal.getName());
        return likesService.getYouLiked(loggedInUsers);
    }

    @GetMapping("/likes/users/count")
    public int countTotalVisitedUsers(Principal principal) {
        User user = userService.findExistingEmail(principal.getName());

        return likesService.countTotalLikes(user);
    }

    @GetMapping("/likes/you-liked/count")
    public int countTotalUserLikesBy(Principal principal) {
        User user = userService.findExistingEmail(principal.getName());
        return likesService.countTotalUserLikesBy(user);
    }

    @PostMapping("/likes/{id}/update")
    public Likes updatesLikeStatus(@RequestBody Likes likes, @PathVariable("id") int id, Principal principal) {
        User user = userService.findExistingEmail(principal.getName());
        likes.setLikedBy(user);
        likes.setLikedTo(likes.getLikedTo());
        if (likes.isStatus()) {
            likes.setStatus(false);

            return likesService.updateLikes(likes.getId(), false);
        } else {
            likes.setStatus(true);
        }
        return likesService.updateLikes(likes.getId(), true);
    }


    @PostMapping("/likes/{id}/delete")
    public int deleteLike(@RequestBody @PathVariable("id") int id) {
        return likesService.deleteLikes(id);
    }


}
