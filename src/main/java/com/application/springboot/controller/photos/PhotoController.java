package com.application.springboot.controller.photos;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.apigateway.model.Model;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.application.springboot.model.Photos;
import com.application.springboot.model.User;
import com.application.springboot.service.UserService;
import com.application.springboot.service.photo.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping( "/api")
public class PhotoController {

    @Autowired
    public PhotoService photoService;
    @Autowired
    public UserService userService;

    Regions clientRegions =Regions.DEFAULT_REGION;
    @Value("${bucketName}")
    String bucketName;
    @Value("${SECRET-KEY}")
    String keyName;

    @GetMapping("/photos/all")
    public List<Photos> listAllUsersPhotos(Principal principal){
        User user = userService.findExistingEmail(principal.getName());
        System.out.println(photoService.showAllPhotos(user));
         return photoService.showAllPhotos(user);
    }

    @PostMapping("/photos/{id}/delete")
    public void deletePhoto(@PathVariable("id") int id , Model model , Principal principal){
        System.out.println(id);
        photoService.deletePhotos(id);
        User user = userService.findExistingEmail(principal.getName());
        if(user.getEmail().equals(principal.getName())){

            try{
                AmazonS3Client amazonS3Client = (AmazonS3Client) AmazonS3ClientBuilder.standard()
                        .withCredentials(new ProfileCredentialsProvider())
                        .withRegion(clientRegions)
                        .build();
                amazonS3Client.deleteObject(bucketName,keyName);

            } catch (SdkClientException e){
                e.printStackTrace();
            }
        }
    }

    @PostMapping("/photo/{id}/update")
    public void updateUserPhoto(@PathVariable("id") final int id , @RequestParam("photoType") String photoType,Principal principal) throws IOException {
        User user = userService.findExistingEmail(principal.getName());
        if(user.getEmail().equals(principal.getName())){
            photoService.updateUserPhotos(photoType,id);
            try{
                AmazonS3Client amazonS3Client = (AmazonS3Client) AmazonS3ClientBuilder.standard()
                            .withCredentials(new ProfileCredentialsProvider())
                            .withRegion(clientRegions)
                            .build();

                amazonS3Client.deleteObject(bucketName,keyName);
            } catch (SdkClientException e){
                e.printStackTrace();
            }
        }
    }

}
