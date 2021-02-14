package com.application.springboot.service.LikeService;

import com.application.springboot.model.Likes;
import com.application.springboot.model.User;
import com.application.springboot.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.Like;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;


    public int countTotalLikes(User user) {
       return likesRepository.countDistinctByLikedBy(user);
    }
    public int countTotalUserLikesBy(User user) {
        return likesRepository.countDistinctByLikedTo(user);
    }

    public List<Likes> getLikedUsers(User likedTo) {
        return  likesRepository.findDistinctByLikedTo(likedTo);
    }
    public List<Likes> getYouLiked(User likedBy) {
        return  likesRepository.findDistinctByLikedBy(likedBy);
    }
    public Likes saveLikes(Likes like){
        return likesRepository.save(like);
    }
    public Likes findExistingUser(User likedTo, User likedBy){
        return likesRepository.findByLikedToAndLikedBy(likedTo,likedBy);
    }

    public Likes updateLikes( int id,boolean status) {
        return  likesRepository.updatelikesStauts(id,status);
    }
    public int deleteLikes(int id){
        return likesRepository.deleteById(id);
    }
    public int  countTotalLikes(User likedBy,User LikedTo){
        return likesRepository.countAllByLikedByAndLikedTo(likedBy, LikedTo);
    }
}
