package com.application.springboot.repository.photostorage;

import com.application.springboot.model.Photos;
import com.application.springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PhotoStorageRepository extends JpaRepository<Photos,Integer> {

    List<Photos> findAllByPrincipalName(User user);
    //total no of user photos
    int countPhotosByPrincipalName(User User);

    @Query("update Photos p set p.photoUrl=:photoUrl where p.id=:id")
    Photos updatePhoto(@Param("photoUrl")String photoUrl,int id);

    //update profile status in Profile
  
   @Modifying
   @Transactional
   @Query("update Photos  p set p.photoType =:photoType where p.id = :id")
    void updateUserPhoto(@Param("id")int id,@Param("photoType")String type);

    @Transactional
    @Modifying
    @Query(value="update Photos p SET p.photoUrl = :link ,p.photoType = :photoType,p.principalName= :user WHERE p.principalName.email =:email")
    int insertUserProfilePicture(@Param("link") String link,  @Param("photoType") String photoType ,User user, @Param("email") String email);

}
