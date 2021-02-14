package com.application.springboot.service;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.application.springboot.model.Photos;
import com.application.springboot.service.photo.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;

@Service
public class AmazonService {

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
    private PhotoService photoService;

    @Autowired
    private UserService userService;

    /*This function uses the basic authentication in AWS
    *
    * */
    @PostConstruct
    public void initializeAmazon(){
        BasicAWSCredentials  credentials= new BasicAWSCredentials(this.accessKey,this.secretKey);
        this.s3client = AmazonS3ClientBuilder.standard()
                            .withRegion(Regions.US_EAST_1)
                            .withCredentials(new AWSStaticCredentialsProvider(credentials)).build();
    }

    // This method is used to upload the user profile photo
    public String uploadFile(MultipartFile multipartFile, Principal principal){
        String fileUrl ="";
            try {
                 File file = convertMultiPartToFile(multipartFile);
                 String fileName = generateFileName(multipartFile);
                 fileUrl = endPointurl + "/"+ bucketName + "/photos/" + fileName;
                uploadFileToS3Bucket(fileName,file,principal);
                ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                        .withBucketName(bucketName)
                        .withPrefix(principal.getName()+"/photos/").withDelimiter("/");
                ObjectListing objectListing;

                do{
                    objectListing = s3client.listObjects(listObjectsRequest);

                    for(S3ObjectSummary objectSummary: objectListing.getObjectSummaries()){
                        userService.changeUserProfilePicture("https://user-photo-videos.s3.amazonaws.com/" + objectSummary.getKey(),principal.getName());

                        return  "settings/settings";
                    }
                }while (objectListing.isTruncated());
                file.delete();
             } catch (Exception ex) {
                ex.printStackTrace();
            }
        return "settings/settings";
    }

    // This method is used to upload the photo in the amazon and the db
    public String uploadUserImages(MultipartFile multipartFile,Principal principal) {
        String fileUrl ;
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endPointurl + "/" + bucketName + "/photos/" + fileName;
            uploadFileToS3Bucket(fileName,file,principal);


            ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                    .withBucketName(bucketName)
                    .withPrefix(principal.getName()+"/photos/").withDelimiter("/");
            ObjectListing objectListing;

            do{
                objectListing = s3client.listObjects(listObjectsRequest);

                for(S3ObjectSummary objectSummary: objectListing.getObjectSummaries()){
                    System.out.print("------------------------------");
                    //saving the user photo
                    Photos photos = new Photos();
                    photos.setPhotoUrl("https://user-photo-videos.s3.amazonaws.com/"+principal.getName()+"/photos/" + fileName);
                    photos.setPhotoType("PUBLIC");
                    photos.setPrincipalName(userService.findExistingEmail(principal.getName()));
                    photoService.savePhotos(photos);
                    System.out.print("------------------------------");
                    return  "redirect:/profile";
                }
            }while (objectListing.isTruncated());
            file.delete();
            return "redirect:/profile";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/profile";
    }

    private void uploadFileToS3Bucket(String fileName, File file,Principal principal) {
        s3client.putObject(new PutObjectRequest(bucketName,principal.getName()+"/photos/"+fileName,file)
                .withCannedAcl(CannedAccessControlList.PublicRead)
            );

    }



    private String generateFileName(MultipartFile multipartFile) {
        return  new Date().getTime()+"-"+multipartFile.getOriginalFilename().replace("","_");
    }
    //
    private File convertMultiPartToFile(MultipartFile multipartFile) throws IOException {
        File convFile = new File(multipartFile.getOriginalFilename());
        FileOutputStream fileOutputStream = new FileOutputStream(convFile);
        fileOutputStream.write(multipartFile.getBytes());
        fileOutputStream.close();
        return convFile;
    }




}
